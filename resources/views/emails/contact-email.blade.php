@extends('layouts.mail')


@section('header')

<h1 style="color:white"> New Contact from {{ $name ?? "" }},</h1>
@endsection

@section('body')
<p style="color: rgb(31,41,55); " >{{ $msgContent ?? ""}}</p>
@endsection



@section('footer')
<p style="color: white; ">CarDrive Contact Mail</p>
@endsection


