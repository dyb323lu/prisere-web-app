const express = require('express');
const OAuthClient = require('intuit-oauth');
const fetch = require('node-fetch');
const router = express.Router();

let oauthClient = null;
let accessToken = null;

// Route to initiate Intuit OAuth flow
router.get('/auth', (req, res) => {
    // Initialize OAuthClient with environment variables
    oauthClient = new OAuthClient({
        clientId: process.env.QUICKBOOKS_CLIENT_ID,
        clientSecret: process.env.QUICKBOOKS_CLIENT_SECRET,
        environment: 'sandbox', // Use 'production' for live environments
        redirectUri: process.env.QUICKBOOKS_REDIRECT_URI,
    });

    // Generate the authorization URI
    const authUri = oauthClient.authorizeUri({
        scope: [OAuthClient.scopes.Accounting, OAuthClient.scopes.OpenId],
        state: 'testState',
    });
    console.log('Redirect URI:', authUri);  // Log the authorization URL

    res.redirect(authUri);
});

// Callback route to handle OAuth response
router.get('/callback', async (req, res) => {
    console.log('Callback URL:', req.url); // This will log the full URL, including the query parameters
    const { code, state } = req.query;  // Ensure you're receiving the code and state

    if (!code) {
        return res.status(400).send('Authorization code missing.');
    }
    if (state !== 'testState') {
        return res.status(400).send('Invalid state parameter.');
    }

    try {
        // Exchange the authorization code for an access token
        const authResponse = await oauthClient.createToken(req.url);  // Pass the full URL to createToken
        accessToken = authResponse.getJson().access_token;
        res.send('QuickBooks authentication successful!');
    } catch (error) {
        console.error('OAuth Error:', error);
        res.status(500).send('Authentication failed.');
    }
});

// Route to fetch revenue data
router.get('/revenue', async (req, res) => {
    if (!accessToken) {
        return res.status(401).send('Unauthorized. Please authenticate with QuickBooks first.');
    }

    try {
        const companyId = process.env.QUICKBOOKS_SANDBOX_COMPANY_ID; // Use sandbox company ID from env
        const startDate = `${new Date().getFullYear() - 2}-01-01`;
        const endDate = `${new Date().getFullYear()}-12-31`;
        const url = `https://sandbox-quickbooks.api.intuit.com/v3/company/${companyId}/reports/ProfitAndLoss?start_date=${startDate}&end_date=${endDate}&minorversion=65`;

        // Make the API call
        const response = await oauthClient.makeApiCall({ url });

        console.log('Full Response:', response);

        const data = response.json;
        console.log('Revenue Response Body:', data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching revenue data:', error.response?.data || error.message);
        res.status(500).json({
            error: error.response?.data || 'Failed to fetch revenue data.',
        });
    }
});

module.exports = router;
