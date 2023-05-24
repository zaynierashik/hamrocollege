# HamroCollege: College Information System

# Building a database
Database name: database

Database table: admin_data, admission_data, college_data, course_data, feedback_data, institution_data and user_data
  1. admin_data table should have column: adminId [primary key], name, phone, email, password[255] and role[defined: admin]
  2. admission_data table should have column: admissionId [primary key], username, phone, email, name, title and message
  3. college_data table should have column: collegeId [primary key], affiliation, name, overview, message, reason, program, phone, email, website, address, location and logo
  4. course_data table should have column: courseId [primary key], title, abbreviation, content, eligibility and job
  5. feedback_data table should have column: feedbackId [primary key], username, email and feedback
  6. institution_data table should have column: institutionId [primary key], name, phone, email, password[255] and role[defined: institution]
  7. user_data table should have column: userId [primary key], name, phone, email, password[255] and role[defined: user]

Database view: authentication
  1. authentication view should have column: name, email, password[255] and role

# Creating view
For authentication view: CREATE OR REPLACE VIEW authentication AS SELECT name, email, password, role FROM institution_data UNION SELECT name, email, password, role FROM user_data;
