export function formatNumber(num, useDecimals = true, useThousandsSeparator = false) {
    const number = parseFloat(num);
    if (isNaN(number)) return 'N/A';
    
    let options = {};
    if (useDecimals) {
        options.minimumFractionDigits = 2;
        options.maximumFractionDigits = 2;
    } else {
        options.minimumFractionDigits = 0;
        options.maximumFractionDigits = 4; // Allow for fractional shares
    }
    
    if (useThousandsSeparator) {
        return number.toLocaleString('en-US', options);
    }
    // toFixed is better for non-locale-specific formatting
    return number.toFixed(options.maximumFractionDigits);
}