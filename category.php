<?php
    session_start();
    include('connect.php');

$affiliation = $_GET['affiliation'];

// Perform any necessary processing or database queries based on the selected affiliation
// Fetch and display the affiliated colleges accordingly
// Example:
if ($affiliation === 'TU') {
    echo "Affiliated colleges of Tribhuvan University";
} elseif ($affiliation === 'KU') {
    echo "Affiliated colleges of Kathmandu University";
} elseif ($affiliation === 'PU') {
    echo "Affiliated colleges of Purbanchal University";
} elseif ($affiliation === 'International') {
    echo "International affiliated colleges";
} else {
    echo "Invalid affiliation selected";
}
?>