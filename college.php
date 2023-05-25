<?php
    session_start();
    include 'connect.php';

    $i_id = $_GET['institutionId'];
    if(!isset($_SESSION['institutionemail'])){
        header('location: homepage.php');
    }

    // Update Colleges

    $stmt = $conn->prepare("SELECT * FROM college_data WHERE collegeId = :collegeId");
    $stmt ->bindParam(":collegeId", $collegeId);
    $stmt ->execute();
    $value = $stmt->fetch(PDO::FETCH_ASSOC);

    $collegeId = isset($value['collegeId']) ? $value['collegeId'] : '';
    $affiliation = isset($value['affiliation']) ? $value['affiliation'] : '';
    $name = isset($value['name']) ? $value['name'] : '';
    $overview = isset($value['overview']) ? $value['overview'] : '';
    $message = isset($value['message']) ? $value['message'] : '';
    $reason = isset($value['reason']) ? $value['reason'] : '';
    $program = isset($value['program']) ? $value['program'] : '';
    $phone = isset($value['phone']) ? $value['phone'] : '';
    $email = isset($value['email']) ? $value['email'] : '';
    $website = isset($value['website']) ? $value['website'] : '';
    $address = isset($value['address']) ? $value['address'] : '';
    $location = isset($value['location']) ? $value['location'] : '';
    $logo = isset($value['logo']) ? $value['logo'] : '';

    if(isset($_POST['update-college-submit'])){
        $collegeId = $_POST['collegeId'];
        $affiliation = $_POST['affiliation'];
        $name = $_POST['name'];
        $overview = nl2br($_POST['overview']);
        $message = nl2br($_POST['message']);
        $reason = nl2br($_POST['reason']);
        $program = nl2br($_POST['program']);
        $phone = nl2br($_POST['phone']);
        $email = nl2br($_POST['email']);
        $website = nl2br($_POST['website']);
        $address = nl2br($_POST['address']);
        $location = nl2br($_POST['location']);
        $logo = nl2br($_POST['logo']);

        if(empty($_POST['collegeId']) || empty($_POST['affiliation']) || empty($_POST['name']) || empty($_POST['overview']) || empty($_POST['message']) || empty($_POST['reason']) || empty($_POST['program']) || empty($_POST['phone']) || empty($_POST['email']) || empty($_POST['website']) || empty($_POST['address']) || empty($_POST['location']) || empty($_POST['logo'])){
            echo '<script> alert("Please fill all the fields."); window.location.href = "college.php?institutionId="<?php echo $i_id; ?>""; </script>';
        }else{
            $stmt = $conn->prepare("UPDATE college_data SET collegeId = :collegeId, affiliation =:affiliation, name = :name, overview = :overview, message = :message, reason = :reason, program = :program, phone =:phone, email =:email, website =:website, address =:address, location =:location, logo = :logo WHERE collegeId = :collegeId");
            $stmt ->bindParam(":collegeId", $i_id);
            $stmt ->bindParam(":affiliation", $affiliation);
            $stmt ->bindParam(":name", $name);
            $stmt ->bindParam(":overview", $overview);
            $stmt ->bindParam(":message", $message);
            $stmt ->bindParam(":reason", $reason);
            $stmt ->bindParam(":program", $program);
            $stmt ->bindParam(":phone", $phone);
            $stmt ->bindParam(":email", $email);
            $stmt ->bindParam(":website", $website);
            $stmt ->bindParam(":address", $address);
            $stmt ->bindParam(":location", $location);
            $stmt ->bindParam(":logo", $logo);
            $stmt ->execute();
    
            echo '<script> alert("College updated successfully."); window.location.href = "college.php?institutionId="<?php echo $i_id; ?>""; </script>';
        }
    }
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hamro College</title>
    <link rel="stylesheet" href="user-admin.css">
    <script src="https://kit.fontawesome.com/296ff2fa8f.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="180x180" href="Favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="Favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="Favicon/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">
</head>
<body>
    <!-- Main Page -->

    <a href="institution.php"><img src="Images/websitelogo.png" alt="Website Logo" class="website-logo"></a>
    
    <div class="main-navbar">
        <nav class="navbar">
            <ul>
                <li><div class="scroll-to-section"><?php echo $_SESSION['institutionemail'] ?></div></li>
                <li class="logout"><a href="logout.php" class="scroll-to-section">logout</a></li>
            </ul>
        </nav>

        <nav class="nav">
            <ul>
                <li><a href="institution.php" class="nav-section">Dashboard</a></li>
                <li><a href="course.php" class="nav-section">Course</a></li>
                <li><a href="college.php?institutionId=<?php echo $_SESSION['institutionId']?>" class="nav-section active">College</a></li>
            </ul>
        </nav>
    </div>
    
    <img src="Images/shape1.png" class="admin-shape-one">

    <div class="top hidden">
        <a href="#top" class="top"><i class="fa-solid fa-arrow-right fa-rotate-270 fa-lg" style="color: black;"></i></a>
    </div>

    <!-- Manage Colleges -->

    <div class="college-details" id="college-update">
        <form action="" method="POST" class="manage-college-form">
            <p class="update-college-title">UPDATE COLLEGE</p>
            <div class="input-container">
                <?php
                    $stmt = $conn->prepare("SELECT * FROM college_data WHERE collegeId = :instutionId");
                    $stmt -> bindParam(":instutionId", $i_id);
                    $stmt ->execute();
                    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
                    
                    foreach ($result as $value){
                ?>
                <input type="text" class="collegeId" name="collegeId" id="collegeId" placeholder="College ID" value="College ID: <?php echo $value['collegeId'] ?>" readonly>
                <select class="affiliation" name="affiliation">
                    <option value="">Affiliation</option>
                    <option value="TU">TU</option>
                    <option value="KU">KU</option>
                    <option value="PU">PU</option>
                    <option value="International">International</option>
                </select>

                <input type="text" class="collegename" name="name" id="name" placeholder="College Name" value="<?php echo $value['name'] ?>" readonly>
                <textarea class="overview" name="overview" id="overview" cols="60" rows="10" placeholder="About College"><?php echo $value['overview'] ?></textarea>
                <textarea class="reason" name="reason" id="reason" cols="60" rows="10" placeholder="Reason to Enroll"><?php echo $value['reason'] ?></textarea>
                <textarea class="message" name="message" id="message" cols="60" rows="10" placeholder="Principal Message"><?php echo $value['message'] ?></textarea>
                <textarea class="program" name="program" id="program" cols="60" rows="10" placeholder="Offered Programs"><?php echo $value['program'] ?></textarea>

                <input type="text" name="phone" id="phone" placeholder="Phone Number" value="<?php echo $value['phone'] ?>">
                <input type="email" name="email" id="email" placeholder="Email Address" value="<?php echo $value['email'] ?>">
                <input type="text" name="website" id="website" placeholder="College Website" value="<?php echo $value['website'] ?>">
                <input type="text" name="address" id="address" placeholder="Address" value="<?php echo $value['address'] ?>">
                <input type="file" name="logo" id="logo" accept="logo/*">
                <textarea name="location" id="location" cols="60" rows="4" placeholder="Location"><?php echo $value['location'] ?></textarea>
            </div>

            <input type="submit" class="submit" name="update-college-submit" id="update-submit" value="Update">
            <?php } ?>
        </form>
    </div>
    
    <script src="script.js"></script>
</body>
</html>