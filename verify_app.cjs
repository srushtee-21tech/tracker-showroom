const http = require('http');

const request = (url, options = {}, body = null) => {
  return new Promise((resolve, reject) => {
    const req = http.request(url, options, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve({ statusCode: res.statusCode, headers: res.headers, data: JSON.parse(data) });
        } catch (e) {
          resolve({ statusCode: res.statusCode, headers: res.headers, data });
        }
      });
    });
    req.on('error', reject);
    if (body) {
      req.write(JSON.stringify(body));
    }
    req.end();
  });
};

async function runVerification() {
  console.log('--- STARTING TRACKER SHOWROOM FULL-STACK VERIFICATION ---');

  // 1. Healthcheck
  try {
    const health = await request('http://localhost:5000/api/health');
    console.log('✅ 1. Backend Health Check:', health.statusCode, health.data);
  } catch (err) {
    console.error('❌ 1. Backend Health Check failed:', err.message);
    process.exit(1);
  }

  // 2. Public Products List
  try {
    const products = await request('http://localhost:5000/api/products');
    console.log(`✅ 2. Public Products API: Status ${products.statusCode}, Count: ${products.data.count}`);
  } catch (err) {
    console.error('❌ 2. Products API failed:', err.message);
  }

  // 3. Public Showrooms List
  try {
    const showrooms = await request('http://localhost:5000/api/showrooms');
    console.log(`✅ 3. Public Showrooms API: Status ${showrooms.statusCode}, Count: ${showrooms.data.count}`);
  } catch (err) {
    console.error('❌ 3. Showrooms API failed:', err.message);
  }

  // 4. Admin Login
  let adminToken = '';
  try {
    const loginRes = await request('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      email: 'admin@trackershowroom.com',
      password: 'Admin@123456',
    });
    console.log('✅ 4. Admin Login API:', loginRes.statusCode, loginRes.data.message);
    adminToken = loginRes.data.token;
  } catch (err) {
    console.error('❌ 4. Admin Login failed:', err.message);
  }

  // 5. Admin Stats Endpoint (Protected)
  try {
    const statsRes = await request('http://localhost:5000/api/stats', {
      method: 'GET',
      headers: { Authorization: `Bearer ${adminToken}` },
    });
    console.log('✅ 5. Protected Admin Stats API:', statsRes.statusCode, statsRes.data.data);
  } catch (err) {
    console.error('❌ 5. Admin Stats API failed:', err.message);
  }

  // 6. Public Enquiry Submission
  let testEnquiryId = '';
  try {
    const enqRes = await request('http://localhost:5000/api/enquiries', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    }, {
      customerName: 'Test Fleet Manager',
      email: 'testmanager@fleet.demo',
      phone: '+1 555-999-8888',
      companyName: 'Test Transit Inc',
      enquiryType: 'Book Live Demo',
      message: 'Automated verification test enquiry.',
    });
    console.log('✅ 6. Submit Public Enquiry:', enqRes.statusCode, enqRes.data.message);
    testEnquiryId = enqRes.data.data._id;
  } catch (err) {
    console.error('❌ 6. Submit Enquiry failed:', err.message);
  }

  // 7. Update Enquiry Status (Protected Admin)
  if (testEnquiryId && adminToken) {
    try {
      const updateRes = await request(`http://localhost:5000/api/enquiries/${testEnquiryId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminToken}`,
        },
      }, {
        status: 'Contacted',
        internalNotes: 'Verified via automated integration test.',
      });
      console.log('✅ 7. Admin Update Enquiry Status:', updateRes.statusCode, updateRes.data.data.status);
    } catch (err) {
      console.error('❌ 7. Update Enquiry Status failed:', err.message);
    }
  }

  // 8. Frontend Dev Server HTTP check
  try {
    const frontendRes = await request('http://localhost:5173');
    console.log('✅ 8. Frontend Dev Server (Port 5173): Status', frontendRes.statusCode);
  } catch (err) {
    console.error('❌ 8. Frontend Server check failed:', err.message);
  }

  console.log('--- VERIFICATION COMPLETE ---');
}

runVerification();
