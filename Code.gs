function onOpen() {
  var ui = SpreadsheetApp.getUi();
  ui.createMenu('📦 Inventory')
    .addItem('🔍 Check Low Stock', 'showLowStock')
    .addItem('📧 Email Low Stock Report', 'emailLowStock')
    .addItem('⚙️ Set Threshold', 'setThreshold')
    .addSeparator()
    .addItem('📊 View All Stock', 'viewAllStock')
    .addToUi();
}

// --- CONFIG: EDIT THESE TO MATCH YOUR SHEET ---
const CONFIG = {
  sheetName: 'Inventory',        // Your sheet tab name (e.g., "Stock", "Sheet1")
  nameCol: 1,                    // Column A: Item Name
  skuCol: 2,                     // Column B: SKU/Code
  stockCol: 3,                   // Column C: Current Stock
  reorderCol: 4,                 // Column D: Reorder Level
  categoryCol: 5,                // Column E: Category (optional)
  threshold: 0                   // 0 = use per-item Reorder Level column
};
// ------------------------------------------------

function getData() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getSheetByName(CONFIG.sheetName);
  if (!sheet) throw new Error('Sheet "' + CONFIG.sheetName + '" not found. Check CONFIG.sheetName');
  var data = sheet.getDataRange().getValues();
  return { sheet: sheet, headers: data[0], rows: data.slice(1) };
}

function getLowStockItems() {
  var { rows } = getData();
  var low = [];
  rows.forEach(function(r, i) {
    var stock = parseFloat(r[CONFIG.stockCol - 1]) || 0;
    var reorder = parseFloat(r[CONFIG.reorderCol - 1]) || 0;
    var limit = CONFIG.threshold > 0 ? CONFIG.threshold : reorder;
    if (stock <= limit && stock >= 0) {
      low.push({
        row: i + 2,
        name: r[CONFIG.nameCol - 1],
        sku: r[CONFIG.skuCol - 1],
        stock: stock,
        reorder: reorder,
        category: r[CONFIG.categoryCol - 1] || ''
      });
    }
  });
  return low;
}

// 1. SHOW IN SIDEBAR
function showLowStock() {
  var low = getLowStockItems();
  var html = buildSidebarHtml(low);
  SpreadsheetApp.getUi().showSidebar(HtmlService.createHtmlOutput(html).setTitle('Low Stock Items'));
}

function buildSidebarHtml(items) {
  if (items.length === 0) return '<div style="padding:20px;text-align:center;color:#666;">✅ All items in stock</div>';
  var rows = items.map(function(it) {
    return '<tr><td>' + it.name + '</td><td>' + it.sku + '</td><td style="color:#c00;font-weight:bold;">' + it.stock + '</td><td>' + it.reorder + '</td><td>' + it.category + '</td></tr>';
  }).join('');
  return '<style>table{width:100%;border-collapse:collapse}th,td{padding:8px;border-bottom:1px solid #eee;text-align:left}th{background:#f5f5f5}tr:hover{background:#fafafa}</style>' +
         '<table><thead><tr><th>Item</th><th>SKU</th><th>Stock</th><th>Reorder</th><th>Category</th></tr></thead><tbody>' + rows + '</tbody></table>' +
         '<div style="margin-top:10px;font-size:12px;color:#666;">' + items.length + ' item(s) need attention</div>';
}

// 2. EMAIL REPORT (CONNECTED FEATURE)
function emailLowStock() {
  var low = getLowStockItems();
  if (low.length === 0) {
    SpreadsheetApp.getUi().alert('✅ No low-stock items');
    return;
  }
  var email = Session.getActiveUser().getEmail(); // or hardcode: 'manager@company.com'
  var subject = '🚨 Low Stock Alert — ' + low.length + ' items';
  var body = buildEmailBody(low);
  MailApp.sendEmail({ to: email, subject: subject, htmlBody: body });
  SpreadsheetApp.getUi().alert('📧 Email sent to ' + email);
}

function buildEmailBody(items) {
  var rows = items.map(function(it) {
    return '<tr><td style="padding:8px;border:1px solid #ddd;">' + it.name + '</td><td style="padding:8px;border:1px solid #ddd;">' + it.sku + '</td><td style="padding:8px;border:1px solid #ddd;color:#c00;font-weight:bold;">' + it.stock + '</td><td style="padding:8px;border:1px solid #ddd;">' + it.reorder + '</td><td style="padding:8px;border:1px solid #ddd;">' + it.category + '</td></tr>';
  }).join('');
  return '<h3>Low Stock Report</h3><p>Generated: ' + new Date().toLocaleString() + '</p>' +
         '<table style="border-collapse:collapse;width:100%;"><thead><tr style="background:#f0f0f0;"><th style="padding:8px;border:1px solid #ddd;">Item</th><th style="padding:8px;border:1px solid #ddd;">SKU</th><th style="padding:8px;border:1px solid #ddd;">Stock</th><th style="padding:8px;border:1px solid #ddd;">Reorder</th><th style="padding:8px;border:1px solid #ddd;">Category</th></tr></thead><tbody>' + rows + '</tbody></table>';
}

// 3. SET THRESHOLD PROMPT
function setThreshold() {
  var ui = SpreadsheetApp.getUi();
  var response = ui.prompt('Set Low-Stock Threshold', 'Enter quantity (0 = use per-item Reorder Level):', ui.ButtonSet.OK_CANCEL);
  if (response.getSelectedButton() === ui.Button.OK) {
    var val = parseInt(response.getResponseText(), 10);
    if (!isNaN(val) && val >= 0) {
      CONFIG.threshold = val;
      PropertiesService.getScriptProperties().setProperty('threshold', val);
      ui.alert('Threshold set to ' + (val === 0 ? 'per-item Reorder Level' : val));
    } else {
      ui.alert('Invalid number');
    }
  }
}

// 4. VIEW ALL STOCK
function viewAllStock() {
  var { sheet, headers, rows } = getData();
  var html = '<style>table{width:100%;border-collapse:collapse;font-size:13px}th,td{padding:6px;border:1px solid #eee;text-align:left}th{background:#f5f5f5;position:sticky;top:0}</style>';
  html += '<table><thead><tr>' + headers.map(function(h){ return '<th>' + h + '</th>'; }).join('') + '</tr></thead><tbody>';
  rows.forEach(function(r) {
    var stock = parseFloat(r[CONFIG.stockCol - 1]) || 0;
    var reorder = parseFloat(r[CONFIG.reorderCol - 1]) || 0;
    var style = stock <= reorder ? 'style="background:#fff0f0;"' : '';
    html += '<tr ' + style + '>' + r.map(function(c){ return '<td>' + c + '</td>'; }).join('') + '</tr>';
  });
  html += '</tbody></table>';
  SpreadsheetApp.getUi().showModalDialog(HtmlService.createHtmlOutput(html).setWidth(900).setHeight(600), 'All Stock');
}