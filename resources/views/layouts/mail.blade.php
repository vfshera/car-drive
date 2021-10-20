<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Car Drive Email</title>
</head>
<body style="margin: 0; padding: 0; box-sizing:border-box; height: 100%">

<div class="email"  >

<div class="email-header "  style="background: rgb(20, 33, 61); padding:10px">
    @yield('header')
</div>

<div class="email-body" style="padding:10px;border-left: rgb(20, 33, 61) 2px dashed; border-right: rgb(20, 33, 61) 2px dashed;">
@yield('body')
</div>

<div class="footer" style="background: rgb(20, 33, 61); padding:10px">
@yield('footer')
</div>


</div>
    
</body>
</html>