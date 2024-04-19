# Check Tax
[Check Tax](https://kietpawpan.github.io/tax) is a program for checking the individual tax in Thailand, tax year 2566.

> [!NOTE]
> ***key functions:** Number with comma and decimal point, auto updated input, autofill on selection 

## History
Check Tax<sup>TM</sup> is devloped for my personal use in 2567 B.E. The program was first called _Tax Calculator_, sounding not modern to my son. He coined _Check Tax_.

### Difficulties
It is hard to code the HTML input to  accept the number with comma and a decimal point. 
> "Learn from other cool programmers is faster"

> [!TIP]
> - easy-number-separator.js[^1] is a cool script to have comma and decimal point in the input.
> - toLocaleString() is a useful function but make sure the input variable is a number.
> - oninput="function(this.value);" is a much faster way to implement document.getElementById('id').value
>
```
  function bpm(value){
	var text2 = value;
       var arr2 = text2.split('');
  	var out2 = new Array();
  	for(var cnt2=0;cnt2<arr2.length;cnt2++){
    	if(isNaN(arr2[cnt2])==false || arr2[cnt2]=='.'){
      	out2.push(arr2[cnt2]);}}
  	var m = Number(out2.join(''))/12;
	document.getElementById('bpm').innerHTML= "(เดือนละ " + getNumber(m.toFixed(0)).toLocaleString() + ' บาท)';

[^1]: source code by amiryxe (https://www.cssscript.com/easy-number-separator/)

