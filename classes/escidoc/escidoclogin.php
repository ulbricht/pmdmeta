<?php
/*
Copyright [2010] [GFZ German Research Centre for Geosciences]
Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/

/*
 *
 * authentication with escidoc-coreservice
 *
 * *include this page on top of your php-files
 *
 * *login  by calling your php-page with "?login"
 * *logout by calling your php-page with "?logout"
 *
 * IN:  $escidoccoreservice must point to the escidoc-coreservice and must be a string
 *      in format "http://host.domain:port"
 *      optionally "login" or "logout" as HTTP-GET-Parameter
 *
 * OUT: sets an authentication-object in $_SESSION['AUTH']
 *      optionally authenticate with eSciDoc core-service
 *
 * EXCEPTIONS: throws exeption with XML-data from the coreservice or exeptions
 *             in case of no/invalid login data
 *
 */

    include_once('includes/inc_conf.php');
    
    use escidoc\client\UserHandler;
    use escidoc\client\exceptions\server\application\security\AuthenticationException;
    use escidoc\client\exceptions\server\application\notfound\UserAccountNotFoundException;    

    session_start();
    

    $querystring=$_SERVER['QUERY_STRING'];
    $querystring=preg_replace("/login/","",$querystring);
    $querystring=preg_replace("/logout/","",$querystring);
    $querystring=preg_replace("/reauth/","",$querystring);
    $querystring=preg_replace("/&$/","",$querystring);
    
    $myurl="http://".$_SERVER['SERVER_NAME'].":".$_SERVER['SERVER_PORT'].$_SERVER['PHP_SELF']."?".$querystring;
 
           //set userhandle, if necessary
    if (isset($_GET['eSciDocUserHandle']))
        setcookie('eSciDocUserHandle',$_GET['eSciDocUserHandle'], time()+60*60*24);       
    
    if (isset($_COOKIE['eSciDocUserHandle'])){
        $_SESSION['eSciDocUserHandle']=base64_decode($_COOKIE['eSciDocUserHandle']);
    }
    
    if (isset($_REQUEST['eSciDocUserHandle'])){
        $_SESSION['eSciDocUserHandle']=base64_decode($_REQUEST['eSciDocUserHandle']);
    }

       
    if (!isset($_SESSION["eSciDocUserHandle"]) && (isset($_REQUEST["login"]) || isset($_REQUEST["register"])) ){
        unset($_SESSION['eSciDocUserHandle']);
        setcookie('eSciDocUserHandle',"",time()-3600);        
        header("Location: ".$escidoccoreservice."/aa/login?target=".urlencode($myurl));
        die();
    }
    
    if (isset($_REQUEST["reauth"])){
        unset($_SESSION['eSciDocUserHandle']);
        setcookie('eSciDocUserHandle',"",time()-3600);
        header("Location: ".$escidoccoreservice."/aa/logout?target=".urlencode($myurl)); 
        die();
    }    
    
    if(isset($_REQUEST["logout"])){     
        foreach(array_keys($_SESSION) as $key)
            unset($_SESSION[$key]);
        setcookie('eSciDocUserHandle',"",time()-3600);
        header("Location: ".$escidoccoreservice."/aa/logout?target=".urlencode($myurl));          
        die();        
    }
       
?>
