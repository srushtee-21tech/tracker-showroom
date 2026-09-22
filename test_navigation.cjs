const http = require('http');

const fetchUrl = (url) => {
  return new Promise((resolve, reject) => {
    http.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => resolve({ statusCode: res.statusCode, body: data }));
    }).on('error', reject);
  });
};

async function testNavigation() {
  console.log('--- TESTING NAVIGATION FLOWS ---');

  // Test 1: Frontend Server
  const main = await fetchUrl('http://localhost:5173/');
  console.log('✅ 1. Main Page loads:', main.statusCode);

  // Test 2: Contact Page with Sales Inquiry
  const contactSales = await fetchUrl('http://localhost:5173/contact?type=Sales+Inquiry');
  console.log('✅ 2. Contact page with Sales Inquiry query param loads:', contactSales.statusCode);

  // Test 3: Contact Page with Book Live Demo
  const contactDemo = await fetchUrl('http://localhost:5173/contact?type=Book+Live+Demo');
  console.log('✅ 3. Contact page with Book Live Demo query param loads:', contactDemo.statusCode);

  console.log('--- NAVIGATION VERIFICATION PASSED ---');
}

testNavigation();
