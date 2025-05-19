const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname)));

// Set default headers for all responses
app.use((req, res, next) => {
    res.setHeader('Content-Type', 'application/json');
    next();
});

// Conversion functions
const lengthConversions = {
    mm: 1,
    cm: 10,
    m: 1000,
    km: 1000000,
    in: 25.4,
    ft: 304.8,
    yd: 914.4,
    mi: 1609344
};

const weightConversions = {
    mg: 1,
    g: 1000,
    kg: 1000000,
    oz: 28349.5,
    lb: 453592
};

function convertLength(value, from, to) {
    if (!lengthConversions[from] || !lengthConversions[to]) {
        throw new Error('Invalid length unit');
    }
    const mmValue = value * lengthConversions[from];
    return mmValue / lengthConversions[to];
}

function convertWeight(value, from, to) {
    if (!weightConversions[from] || !weightConversions[to]) {
        throw new Error('Invalid weight unit');
    }
    const mgValue = value * weightConversions[from];
    return mgValue / weightConversions[to];
}

function convertTemperature(value, from, to) {
    const validUnits = ['c', 'f', 'k'];
    if (!validUnits.includes(from) || !validUnits.includes(to)) {
        throw new Error('Invalid temperature unit');
    }

    let celsius;
    
    // Convert to Celsius first
    switch(from) {
        case 'c':
            celsius = value;
            break;
        case 'f':
            celsius = (value - 32) * 5/9;
            break;
        case 'k':
            celsius = value - 273.15;
            break;
    }
    
    // Convert from Celsius to target unit
    switch(to) {
        case 'c':
            return celsius;
        case 'f':
            return (celsius * 9/5) + 32;
        case 'k':
            return celsius + 273.15;
    }
}

// Routes
app.get('/', (req, res) => {
    res.setHeader('Content-Type', 'text/html');
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.post('/convert', (req, res) => {
    console.log('Received request:', req.body);

    try {
        const { type, value, from, to } = req.body;

        // Validate input
        if (!type || value === undefined || !from || !to) {
            console.log('Missing fields:', { type, value, from, to });
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const numValue = parseFloat(value);
        if (isNaN(numValue)) {
            console.log('Invalid value:', value);
            return res.status(400).json({ error: 'Invalid value: must be a number' });
        }

        let result;
        switch(type) {
            case 'length':
                result = convertLength(numValue, from, to);
                break;
            case 'weight':
                result = convertWeight(numValue, from, to);
                break;
            case 'temperature':
                result = convertTemperature(numValue, from, to);
                break;
            default:
                console.log('Invalid type:', type);
                return res.status(400).json({ error: 'Invalid conversion type' });
        }

        // Format the result to 4 decimal places
        result = parseFloat(result.toFixed(4));
        
        console.log('Sending response:', { result });
        return res.status(200).json({ result });
    } catch (error) {
        console.error('Conversion error:', error);
        return res.status(400).json({ error: error.message || 'Conversion failed' });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 