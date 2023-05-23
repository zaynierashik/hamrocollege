<?php
    session_start();
    include 'connect.php';
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Hamro College</title>
    <script src="https://kit.fontawesome.com/296ff2fa8f.js" crossorigin="anonymous"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <link rel="apple-touch-icon" sizes="180x180" href="Favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="Favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="Favicon/favicon-16x16.png">
    <link rel="manifest" href="/site.webmanifest">

    <style>
        *{
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: Poppins, sans-serif;
        }

        html{
            background-image: url(Images/background.jpg);
            scroll-behavior: smooth;
        }

        .website-logo{
            margin-top: 3.5vh;
            margin-left: 7vw;
            width: 12.7%;
        }

        .content-container table{
            margin: 3vh 10vw;
            width: 80.20%;
            text-align: justify;
            border-radius: 15px;
            border-collapse: collapse;
        }
        
        .content-container img{
            position: relative;
            top: 1.35vh;
            right: 0.5vw;
            width: 5%;
        }

        .name{
            font-size: 1.5rem;
            font-weight: 500;
            text-align: center;
        }

        .overview, .message, .reason, .program, .contact, .location{
            font-size: 1.15rem;
            font-weight: 500;
        }

        .list-cell-spacing{
            padding: 15px 0px 0px 30px;
            line-height: 4.5vh;
        }

        .cell-spacing{
            padding: 15px 1px 0px 1px;
            line-height: 4.5vh;
        }

        .reason, .program{
            padding-top: 6.7vh;
        }

        .contact-box{
            margin-top: 7vh;
            margin-left: 71.7vw;
            width: 20%;
            border-radius: 15px;
        }

        .contact-box li{
            list-style-type: none;
            padding: 2.5vh 0.1vw 0vh 0.1vw;
            font-size: 0.85rem;
            line-height: 3.7vh;
        }

        .contact-box li a{
            text-decoration: none;
            color: black;
        }

        .contact-box .fa-solid{
            padding-right: 1vw;
        }

        .location-box{
            margin-top: -32vh;
            margin-left: 10vw;
            margin-bottom: 5vh;
            border-radius: 15px;
        }

        .location{
            margin-bottom: 3vh;
        }

        iframe{
            width: 870px;
            height: 450px;
        }
    </style>
</head>
<body>
    <a href="homepage.php"><img src="Images/logo.png" alt="Website Logo" class="website-logo"></a>
    <?php
        if(isset($_GET['collegeId'])){
            $collegeId = $_GET['collegeId'];

            $sql = "SELECT * FROM college_data WHERE collegeId=:collegeId";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':collegeId', $collegeId);
            $stmt->execute();
            $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
        }
        if(count($result)>0){
    ?>
        <div class="content-container">
        <table>
            <?php
                $i=0;
                foreach($result as $row){
            ?>
            <tr>
                <td class="name cell-spacing" colspan="2"><img src="./Images/<?php echo $row['logo']; ?>"><?php echo $row['name']; ?></td>
            </tr>
            <tr>
                <td class="overview cell-spacing" colspan="2"><br>Overview</td>
            </tr>
            <tr>
                <td class="cell-spacing" colspan="2"><?php echo $row['overview']; ?></td>
            </tr>
            <tr>
                <td class="reason cell-spacing" colspan="2">Reason to Choose</td>
            </tr>
            <tr>
                <td class="list-cell-spacing">
                <?php
                    $reason = explode("\n", $row['reason']);
                    echo "<ul>";
                    foreach($reason as $point){
                        echo "<li>$point</li>";
                    }
                    echo "</ul>";
                ?>
                </td>
            </tr>
            <tr>
                <td class="message cell-spacing"><br>Principal Message</td>
            </tr>
            <tr>
                <td class="cell-spacing"><?php echo $row['message']; ?></td>
            </tr>
            <tr>
                <td class="program cell-spacing">Offered Programs</td>
            </tr>
            <tr>
                <td class="list-cell-spacing">
                <?php
                    $program = explode("\n", $row['program']);
                    echo "<ul>";
                    foreach($program as $point){
                        echo "<li>$point</li>";
                    }
                    echo "</ul>";
                ?>
                </td>
            </tr>
            <?php
                $i++;
                }
            ?>
        </table>
        </div>

        <div class="contact-box">
            <p class="contact">Contact</p>
            <ul>
                <li><i class="fa-solid fa-building" style="color: black;"></i> <?php echo $row['name']; ?></li>
                <li><i class="fa-solid fa-phone" style="color: black;"></i><?php echo $row['phone']; ?></li>
                <li><i class="fa-solid fa-envelope" style="color: black;"></i><?php echo $row['email']; ?></li>
                <li><i class="fa-solid fa-globe" style="color: black;"></i><a href="<?php echo $row['website']?>" target="_blank"><?php echo $row['website']; ?></a></li>
            </ul>
        </div>
            
        <div class="location-box">
            <p class="location">Location</p>
            <?php echo $row['location']; ?>
        </div>
                
        <?php 
        }else{
            echo "No content available!";
        }
    ?>
</body>
</html>