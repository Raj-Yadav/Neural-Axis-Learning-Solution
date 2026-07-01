#!/usr/bin/env python3
"""
Backend API Test Suite for Neural Axis Payment/Enrollment System
Tests all payment config and enrollment CRUD endpoints + regression tests
"""

import requests
import json
from typing import Optional

# Configuration
BASE_URL = "https://checkout-placement.preview.emergentagent.com/api"
ADMIN_EMAIL = "admin@neuralaxis.com"
ADMIN_PASSWORD = "NeuralAxis@2024"

# Test state
session = requests.Session()
created_enrollment_id: Optional[str] = None
created_lead_id: Optional[str] = None

def print_test(name: str):
    """Print test name header"""
    print(f"\n{'='*80}")
    print(f"TEST: {name}")
    print('='*80)

def print_result(passed: bool, message: str):
    """Print test result"""
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {message}")

def print_response(response: requests.Response):
    """Print response details for debugging"""
    print(f"Status: {response.status_code}")
    try:
        print(f"Response: {json.dumps(response.json(), indent=2)}")
    except:
        print(f"Response Text: {response.text[:500]}")

# ========== AUTH TESTS (Regression + Setup) ==========

def test_auth_login():
    """Test POST /api/auth/login - sets httpOnly cookies"""
    print_test("Auth Login")
    
    response = session.post(
        f"{BASE_URL}/auth/login",
        json={"email": ADMIN_EMAIL, "password": ADMIN_PASSWORD}
    )
    
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        has_cookies = 'access_token' in session.cookies and 'refresh_token' in session.cookies
        print_result(
            has_cookies and data.get('email') == ADMIN_EMAIL,
            f"Login successful, cookies set: {has_cookies}"
        )
        return True
    else:
        print_result(False, f"Login failed with status {response.status_code}")
        return False

def test_auth_me():
    """Test GET /api/auth/me - verify session"""
    print_test("Auth Me (Session Check)")
    
    response = session.get(f"{BASE_URL}/auth/me")
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        print_result(
            data.get('email') == ADMIN_EMAIL and data.get('role') == 'admin',
            f"Session valid, user: {data.get('email')}, role: {data.get('role')}"
        )
        return True
    else:
        print_result(False, f"Auth check failed with status {response.status_code}")
        return False

# ========== PAYMENT CONFIG TESTS ==========

def test_payment_config():
    """Test GET /api/payment/config (public, no auth)"""
    print_test("Payment Config (Public)")
    
    # Use a fresh session without auth cookies
    response = requests.get(f"{BASE_URL}/payment/config")
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        expected_upi = "rajyadav12121993@okicici"
        expected_payee = "Raj Yadav"
        expected_currency = "INR"
        
        checks = [
            (data.get('upi_id') == expected_upi, f"upi_id: {data.get('upi_id')}"),
            (data.get('payee_name') == expected_payee, f"payee_name: {data.get('payee_name')}"),
            (data.get('currency') == expected_currency, f"currency: {data.get('currency')}")
        ]
        
        all_pass = all(check[0] for check in checks)
        for passed, msg in checks:
            print_result(passed, msg)
        
        return all_pass
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

# ========== ENROLLMENT CRUD TESTS ==========

def test_create_enrollment_valid():
    """Test POST /api/enrollments with valid data (public, no auth)"""
    global created_enrollment_id
    print_test("Create Enrollment - Valid Data (Public)")
    
    payload = {
        "name": "Arjun Sharma",
        "email": "arjun.sharma@example.com",
        "phone": "9876543210",
        "course": "Agentic AI Engineer Bootcamp",
        "amount": 24999,
        "upi_txn_ref": "TXN123ABC456",
        "payer_upi": "arjun@paytm",
        "notes": "Excited to join the bootcamp!"
    }
    
    # Use fresh session without auth
    response = requests.post(f"{BASE_URL}/enrollments", json=payload)
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        
        checks = [
            ('id' in data and len(data['id']) > 0, f"Has UUID id: {data.get('id')}"),
            (data.get('status') == 'pending_verification', f"Status: {data.get('status')}"),
            (data.get('name') == payload['name'], f"Name echoed: {data.get('name')}"),
            (data.get('email') == payload['email'], f"Email echoed: {data.get('email')}"),
            (data.get('phone') == payload['phone'], f"Phone echoed: {data.get('phone')}"),
            (data.get('course') == payload['course'], f"Course echoed: {data.get('course')}"),
            (data.get('amount') == payload['amount'], f"Amount echoed: {data.get('amount')}"),
            (data.get('upi_txn_ref') == payload['upi_txn_ref'], f"UPI txn ref echoed: {data.get('upi_txn_ref')}"),
            (data.get('upi_id_paid_to') == 'rajyadav12121993@okicici', f"UPI ID paid to: {data.get('upi_id_paid_to')}"),
            ('created_at' in data, f"Has created_at: {data.get('created_at')}")
        ]
        
        all_pass = all(check[0] for check in checks)
        for passed, msg in checks:
            print_result(passed, msg)
        
        if 'id' in data:
            created_enrollment_id = data['id']
            print(f"\n📝 Saved enrollment ID for subsequent tests: {created_enrollment_id}")
        
        return all_pass
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

def test_create_enrollment_invalid_email():
    """Test POST /api/enrollments with invalid email format"""
    print_test("Create Enrollment - Invalid Email (422 Expected)")
    
    payload = {
        "name": "Test User",
        "email": "not-an-email",
        "phone": "9876543210",
        "course": "Agentic AI Engineer Bootcamp",
        "amount": 24999,
        "upi_txn_ref": "TXN999"
    }
    
    response = requests.post(f"{BASE_URL}/enrollments", json=payload)
    print_response(response)
    
    passed = response.status_code == 422
    print_result(passed, f"Invalid email rejected with status {response.status_code}")
    return passed

def test_create_enrollment_missing_fields():
    """Test POST /api/enrollments with missing required fields"""
    print_test("Create Enrollment - Missing Required Fields (422 Expected)")
    
    payload = {
        "name": "Test User",
        "email": "test@example.com"
        # Missing phone, course, amount, upi_txn_ref
    }
    
    response = requests.post(f"{BASE_URL}/enrollments", json=payload)
    print_response(response)
    
    passed = response.status_code == 422
    print_result(passed, f"Missing fields rejected with status {response.status_code}")
    return passed

def test_list_enrollments_no_auth():
    """Test GET /api/enrollments without auth (401 expected)"""
    print_test("List Enrollments - No Auth (401 Expected)")
    
    response = requests.get(f"{BASE_URL}/enrollments")
    print_response(response)
    
    passed = response.status_code == 401
    print_result(passed, f"Unauthorized access blocked with status {response.status_code}")
    return passed

def test_list_enrollments_with_auth():
    """Test GET /api/enrollments with auth"""
    print_test("List Enrollments - With Auth")
    
    response = session.get(f"{BASE_URL}/enrollments")
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        is_list = isinstance(data, list)
        has_created = any(e.get('id') == created_enrollment_id for e in data) if created_enrollment_id else True
        
        print_result(is_list, f"Returns list: {is_list}, count: {len(data) if is_list else 0}")
        if created_enrollment_id:
            print_result(has_created, f"Contains created enrollment: {has_created}")
        
        return is_list and has_created
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

def test_list_enrollments_filter_pending():
    """Test GET /api/enrollments?status=pending_verification"""
    print_test("List Enrollments - Filter by Pending Status")
    
    response = session.get(f"{BASE_URL}/enrollments?status=pending_verification")
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        all_pending = all(e.get('status') == 'pending_verification' for e in data)
        
        print_result(
            all_pending,
            f"All items have pending_verification status: {all_pending}, count: {len(data)}"
        )
        return all_pending
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

def test_list_enrollments_filter_all():
    """Test GET /api/enrollments?status=all"""
    print_test("List Enrollments - Filter All")
    
    response = session.get(f"{BASE_URL}/enrollments?status=all")
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        print_result(True, f"Returns all enrollments, count: {len(data)}")
        return True
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

def test_enrollment_stats_no_auth():
    """Test GET /api/enrollments/stats without auth (401 expected)"""
    print_test("Enrollment Stats - No Auth (401 Expected)")
    
    response = requests.get(f"{BASE_URL}/enrollments/stats")
    print_response(response)
    
    passed = response.status_code == 401
    print_result(passed, f"Unauthorized access blocked with status {response.status_code}")
    return passed

def test_enrollment_stats_with_auth():
    """Test GET /api/enrollments/stats with auth"""
    print_test("Enrollment Stats - With Auth")
    
    response = session.get(f"{BASE_URL}/enrollments/stats")
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        
        required_keys = ['total', 'pending_verification', 'verified', 'rejected', 'this_week', 'revenue']
        checks = [(key in data, f"Has key '{key}': {data.get(key)}") for key in required_keys]
        
        # Revenue should be sum of verified only (not pending)
        revenue_is_number = isinstance(data.get('revenue'), (int, float))
        checks.append((revenue_is_number, f"Revenue is numeric: {revenue_is_number}"))
        
        all_pass = all(check[0] for check in checks)
        for passed, msg in checks:
            print_result(passed, msg)
        
        return all_pass
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

def test_get_enrollment_by_id_no_auth():
    """Test GET /api/enrollments/{id} without auth (401 expected)"""
    print_test("Get Enrollment by ID - No Auth (401 Expected)")
    
    if not created_enrollment_id:
        print_result(False, "No enrollment ID available for test")
        return False
    
    response = requests.get(f"{BASE_URL}/enrollments/{created_enrollment_id}")
    print_response(response)
    
    passed = response.status_code == 401
    print_result(passed, f"Unauthorized access blocked with status {response.status_code}")
    return passed

def test_get_enrollment_by_id_with_auth():
    """Test GET /api/enrollments/{id} with auth"""
    print_test("Get Enrollment by ID - With Auth")
    
    if not created_enrollment_id:
        print_result(False, "No enrollment ID available for test")
        return False
    
    response = session.get(f"{BASE_URL}/enrollments/{created_enrollment_id}")
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        correct_id = data.get('id') == created_enrollment_id
        print_result(correct_id, f"Retrieved correct enrollment: {correct_id}")
        return correct_id
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

def test_get_enrollment_nonexistent():
    """Test GET /api/enrollments/{id} with non-existent ID (404 expected)"""
    print_test("Get Enrollment - Non-existent ID (404 Expected)")
    
    fake_id = "00000000-0000-0000-0000-000000000000"
    response = session.get(f"{BASE_URL}/enrollments/{fake_id}")
    print_response(response)
    
    passed = response.status_code == 404
    print_result(passed, f"Non-existent ID returns 404: {passed}")
    return passed

def test_update_enrollment_status_to_verified():
    """Test PATCH /api/enrollments/{id} - update status to verified"""
    print_test("Update Enrollment - Mark as Verified")
    
    if not created_enrollment_id:
        print_result(False, "No enrollment ID available for test")
        return False
    
    response = session.patch(
        f"{BASE_URL}/enrollments/{created_enrollment_id}",
        json={"status": "verified"}
    )
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        status_updated = data.get('status') == 'verified'
        print_result(status_updated, f"Status updated to verified: {status_updated}")
        return status_updated
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

def test_enrollment_stats_revenue_after_verify():
    """Test that stats revenue includes verified enrollment amount"""
    print_test("Enrollment Stats - Revenue After Verification")
    
    response = session.get(f"{BASE_URL}/enrollments/stats")
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        revenue = data.get('revenue', 0)
        # Our test enrollment was 24999, so revenue should be at least that
        revenue_includes_verified = revenue >= 24999
        print_result(
            revenue_includes_verified,
            f"Revenue includes verified enrollment: {revenue_includes_verified}, revenue: {revenue}"
        )
        return revenue_includes_verified
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

def test_update_enrollment_notes():
    """Test PATCH /api/enrollments/{id} - update notes"""
    print_test("Update Enrollment - Update Notes")
    
    if not created_enrollment_id:
        print_result(False, "No enrollment ID available for test")
        return False
    
    new_notes = "Payment verified via bank statement"
    response = session.patch(
        f"{BASE_URL}/enrollments/{created_enrollment_id}",
        json={"notes": new_notes}
    )
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        notes_updated = data.get('notes') == new_notes
        print_result(notes_updated, f"Notes updated: {notes_updated}")
        return notes_updated
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

def test_update_enrollment_empty_body():
    """Test PATCH /api/enrollments/{id} with empty body (400 expected)"""
    print_test("Update Enrollment - Empty Body (400 Expected)")
    
    if not created_enrollment_id:
        print_result(False, "No enrollment ID available for test")
        return False
    
    response = session.patch(
        f"{BASE_URL}/enrollments/{created_enrollment_id}",
        json={}
    )
    print_response(response)
    
    passed = response.status_code == 400
    print_result(passed, f"Empty body rejected with status {response.status_code}")
    return passed

def test_update_enrollment_nonexistent():
    """Test PATCH /api/enrollments/{id} with non-existent ID (404 expected)"""
    print_test("Update Enrollment - Non-existent ID (404 Expected)")
    
    fake_id = "00000000-0000-0000-0000-000000000000"
    response = session.patch(
        f"{BASE_URL}/enrollments/{fake_id}",
        json={"status": "verified"}
    )
    print_response(response)
    
    passed = response.status_code == 404
    print_result(passed, f"Non-existent ID returns 404: {passed}")
    return passed

def test_update_enrollment_no_auth():
    """Test PATCH /api/enrollments/{id} without auth (401 expected)"""
    print_test("Update Enrollment - No Auth (401 Expected)")
    
    if not created_enrollment_id:
        print_result(False, "No enrollment ID available for test")
        return False
    
    response = requests.patch(
        f"{BASE_URL}/enrollments/{created_enrollment_id}",
        json={"status": "rejected"}
    )
    print_response(response)
    
    passed = response.status_code == 401
    print_result(passed, f"Unauthorized access blocked with status {response.status_code}")
    return passed

def test_delete_enrollment_no_auth():
    """Test DELETE /api/enrollments/{id} without auth (401 expected)"""
    print_test("Delete Enrollment - No Auth (401 Expected)")
    
    if not created_enrollment_id:
        print_result(False, "No enrollment ID available for test")
        return False
    
    response = requests.delete(f"{BASE_URL}/enrollments/{created_enrollment_id}")
    print_response(response)
    
    passed = response.status_code == 401
    print_result(passed, f"Unauthorized access blocked with status {response.status_code}")
    return passed

def test_delete_enrollment_nonexistent():
    """Test DELETE /api/enrollments/{id} with non-existent ID (404 expected)"""
    print_test("Delete Enrollment - Non-existent ID (404 Expected)")
    
    fake_id = "00000000-0000-0000-0000-000000000000"
    response = session.delete(f"{BASE_URL}/enrollments/{fake_id}")
    print_response(response)
    
    passed = response.status_code == 404
    print_result(passed, f"Non-existent ID returns 404: {passed}")
    return passed

def test_delete_enrollment_with_auth():
    """Test DELETE /api/enrollments/{id} with auth"""
    print_test("Delete Enrollment - With Auth")
    
    if not created_enrollment_id:
        print_result(False, "No enrollment ID available for test")
        return False
    
    response = session.delete(f"{BASE_URL}/enrollments/{created_enrollment_id}")
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        has_message = 'message' in data
        print_result(has_message, f"Deletion successful: {data.get('message')}")
        return has_message
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

# ========== REGRESSION TESTS ==========

def test_create_lead_regression():
    """Regression: Test POST /api/leads (public)"""
    global created_lead_id
    print_test("REGRESSION: Create Lead (Public)")
    
    payload = {
        "name": "Priya Verma",
        "role": "Data Scientist",
        "institution": "IIT Delhi",
        "email": "priya.verma@iitd.ac.in",
        "phone": "9123456789",
        "message": "Interested in AI bootcamp"
    }
    
    response = requests.post(f"{BASE_URL}/leads", json=payload)
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        has_id = 'id' in data
        status_new = data.get('status') == 'new'
        
        print_result(has_id and status_new, f"Lead created: {has_id}, status: {data.get('status')}")
        
        if 'id' in data:
            created_lead_id = data['id']
        
        return has_id and status_new
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

def test_list_leads_regression():
    """Regression: Test GET /api/leads (auth required)"""
    print_test("REGRESSION: List Leads (Auth Required)")
    
    response = session.get(f"{BASE_URL}/leads")
    print_response(response)
    
    if response.status_code == 200:
        data = response.json()
        is_list = isinstance(data, list)
        print_result(is_list, f"Returns list: {is_list}, count: {len(data) if is_list else 0}")
        return is_list
    else:
        print_result(False, f"Failed with status {response.status_code}")
        return False

# ========== MAIN TEST RUNNER ==========

def run_all_tests():
    """Run all tests in sequence"""
    print("\n" + "="*80)
    print("NEURAL AXIS BACKEND API TEST SUITE")
    print("Testing Payment/Enrollment Endpoints + Regression")
    print("="*80)
    
    results = []
    
    # Auth setup
    results.append(("Auth Login", test_auth_login()))
    results.append(("Auth Me", test_auth_me()))
    
    # Payment config
    results.append(("Payment Config", test_payment_config()))
    
    # Enrollment creation
    results.append(("Create Enrollment - Valid", test_create_enrollment_valid()))
    results.append(("Create Enrollment - Invalid Email", test_create_enrollment_invalid_email()))
    results.append(("Create Enrollment - Missing Fields", test_create_enrollment_missing_fields()))
    
    # Enrollment listing
    results.append(("List Enrollments - No Auth", test_list_enrollments_no_auth()))
    results.append(("List Enrollments - With Auth", test_list_enrollments_with_auth()))
    results.append(("List Enrollments - Filter Pending", test_list_enrollments_filter_pending()))
    results.append(("List Enrollments - Filter All", test_list_enrollments_filter_all()))
    
    # Enrollment stats
    results.append(("Enrollment Stats - No Auth", test_enrollment_stats_no_auth()))
    results.append(("Enrollment Stats - With Auth", test_enrollment_stats_with_auth()))
    
    # Get enrollment by ID
    results.append(("Get Enrollment - No Auth", test_get_enrollment_by_id_no_auth()))
    results.append(("Get Enrollment - With Auth", test_get_enrollment_by_id_with_auth()))
    results.append(("Get Enrollment - Non-existent", test_get_enrollment_nonexistent()))
    
    # Update enrollment
    results.append(("Update Enrollment - Mark Verified", test_update_enrollment_status_to_verified()))
    results.append(("Enrollment Stats - Revenue After Verify", test_enrollment_stats_revenue_after_verify()))
    results.append(("Update Enrollment - Update Notes", test_update_enrollment_notes()))
    results.append(("Update Enrollment - Empty Body", test_update_enrollment_empty_body()))
    results.append(("Update Enrollment - Non-existent", test_update_enrollment_nonexistent()))
    results.append(("Update Enrollment - No Auth", test_update_enrollment_no_auth()))
    
    # Delete enrollment
    results.append(("Delete Enrollment - No Auth", test_delete_enrollment_no_auth()))
    results.append(("Delete Enrollment - Non-existent", test_delete_enrollment_nonexistent()))
    results.append(("Delete Enrollment - With Auth", test_delete_enrollment_with_auth()))
    
    # Regression tests
    results.append(("REGRESSION: Create Lead", test_create_lead_regression()))
    results.append(("REGRESSION: List Leads", test_list_leads_regression()))
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for _, result in results if result)
    total = len(results)
    
    print(f"\nTotal: {total} tests")
    print(f"Passed: {passed} ✅")
    print(f"Failed: {total - passed} ❌")
    print(f"Success Rate: {(passed/total)*100:.1f}%\n")
    
    print("Detailed Results:")
    for name, result in results:
        status = "✅" if result else "❌"
        print(f"  {status} {name}")
    
    print("\n" + "="*80)
    
    return passed == total

if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)
