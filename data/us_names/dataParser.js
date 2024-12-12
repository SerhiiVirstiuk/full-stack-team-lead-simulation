// Import required modules
const fs = require('fs');
const path = require('path');

// Function to parse the file and extract distinct names from JSON field
function extractDistinctNames(filePath) {
    try {
        // Read the file content
        const fileContent = fs.readFileSync(filePath, 'utf-8');

        const jsonData = JSON.parse(fileContent);
        const rows = jsonData.data;

        if (!rows || rows.length === 0) {
            console.log('No data rows found in the file.');
            return [];
        }

        // 11 - Child's first name
        const names = rows.map(row => `${row[11]} (${row[9]}, ${row[10]}, ${row[8]}, ${row[12]})`).filter(Boolean);

        const uniqueNames = new Set(names);

        return Array.from(uniqueNames);
    } catch (error) {
        console.error('Error reading or parsing the file:', error);
        process.exit(1);
    }
}

function main() {
    const filePath = './rows.json';

    const distinctNames = extractDistinctNames(filePath);

    const outputFilePath = path.join(__dirname, 'distinct_names_with_gender_ethnicity_year_and_number.json');
    fs.writeFileSync(outputFilePath, JSON.stringify(distinctNames, null, 2), 'utf-8');

    console.log(`Distinct names have been saved to: ${outputFilePath}`);
}

main();