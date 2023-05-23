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
            margin: 3vh 7.7vw 6.7vh 7.7vw;
            width: 85%;
            text-align: justify;
            /* background-color: white; */
            border-radius: 15px;
            border-collapse: collapse;
            /* box-shadow: 0px 0px 5px 0px rgba(163, 158, 163, 1); */
        }

        .job-container table{
            margin: 6.7vh 10.25vw 1vh 10.25vw;
            text-align: justify;
            background-color: #e6e9ef;
            border-radius: 15px;
            border-collapse: collapse;
            box-shadow: 0px 0px 5px 0px rgba(163, 158, 163, 1);
            width: 80%;
        }
        
        .content-container i{
            position: relative;
            right: 0.5vw;
        }

        .title{
            font-size: 1.5rem;
            font-weight: 500;
            text-align: center;
        }

        .content-cell-spacing{
            padding: 50px 37px 0px 37px;
            line-height: 4.5vh;
        }

        .eligibility, .job{
            font-size: 1.15rem;
            font-weight: 500;
        }

        .cell-spacing{
            padding: 15px 37px 0px 37px;
            line-height: 4.5vh;
        }

        .list-cell-spacing{
            padding: 15px 37px 0px 55px;
            line-height: 4.5vh;
        }

        .job-list-cell-spacing{
            padding: 15px 10px 15px 45px;
            line-height: 4.5vh;
        }

        .job-cell-spacing{
            padding: 15px 27px 0px 27px;
            line-height: 4.5vh;
        }

        .job-list{
            display: flex;
            flex-wrap: wrap;
            margin: 0;
            padding: 0;
        }

        .job-list li{
            margin-right: 2.15vw;
        }
    </style>
</head>
<body>
    <a href="homepage.php"><img src="Images/logo.png" alt="Website Logo" class="website-logo"></a>
    <?php
        if(isset($_GET['courseId'])){
            $courseId = $_GET['courseId'];

            $sql = "SELECT * FROM course_data WHERE courseId=:courseId";
            $stmt = $conn->prepare($sql);
            $stmt->bindParam(':courseId', $courseId);
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
                <td class="title cell-spacing" colspan="2"><i class="fa-sharp fa-solid fa-graduation-cap fa-lg" style="color: #000000;"></i><?php echo $row['title']; ?></td>
            </tr>
            <tr>
                <td class="content content-cell-spacing" colspan="2"><?php echo $row['content']; ?></td>
            </tr>
            <tr>
                <td class="eligibility cell-spacing"><br>Eligibility</td>
            </tr>
            <tr>
                <td class="list-cell-spacing">
                <?php
                    $eligibility = explode("\n", $row['eligibility']);
                    echo "<ul>";
                    foreach($eligibility as $point){
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

        <div class="job-container">
        <table>
            <tr>
                <td class="job job-cell-spacing">Prospect Careers</td>
            </tr>
            <tr>
                <td class="job-list-cell-spacing">
                <?php
                    $job = explode("\n", $row['job']);
                    echo "<ul class='job-list'>";
                    foreach($job as $point){
                        echo "<li>$point</li>";
                    }
                    echo "</ul>";
                ?>
                </td>
            </tr>
        </table>
        </div>
        <?php 
        }else{
            echo "No content available!";
        }
        ?>
</body>
</html>