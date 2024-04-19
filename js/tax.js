/* Copyright (c) 2024 JTECH PROGRAMS (Montri Kiatphaophan)
   v1.0.0 | April 17, 2024 | MIT License */

function tax(){
	let nf = new Intl.NumberFormat('en-US');
	var r = getNumber(document.getElementById('r').value);
	var d = getNumber(document.getElementById('d').value);
	var dc = getNumber(document.getElementById('dc').value);
	var dr = getNumber(document.getElementById('dr').value);
	var r1 = getNumber(document.getElementById('r1').value);
	var r2 = getNumber(document.getElementById('r2').value);
	var r3 = getNumber(document.getElementById('r3').value);
	var r4 = getNumber(document.getElementById('r4').value);
	var r5 = getNumber(document.getElementById('r5').value);
	var e0 = getNumber(document.getElementById('edu').value);
	var d0 = getNumber(document.getElementById('donate').value);
	var p = getNumber(document.getElementById('paid').value);
	var g = getNumber(document.getElementById('gbk').value);
	var p2 = getNumber(document.getElementById('paid2').value);
	var m = getNumber(document.getElementById('m').value);
	var ins = getNumber(document.getElementById('ins').value);
	var h = getNumber(document.getElementById('h').value);
	
	var gbk='';
	if(g>500000){gbk=500000;}
	else{gbk=g;}

      var ex = ''; //50% of revenue, max 100000
      if((r/2)>100000){ex=100000;}
      else{ex=r/2;}

	var health='';
	if(h>25000){health=25000;}
	else{health=h;}

	var insure ='';
	if((ins + health) > 100000){insure=100000-health;}
	else{insure=ins;}
	var otherIncome = m + d + dc + dr; // stock
	var r1r ='';
	if(r1>10000){r1r=10000;} // กองทุนสำรองเลี้ยงชีพลดหย่อนได้ 10000 
	else{r1r=r1;}
	var reduce = r1r +r2+r3+r4+r5; // รายการลดหย่อนทั่วไป บิดา มารดา บุตร ตน ช๊อปดี กองทุน
	var netIncome = r+otherIncome-ex-r1-gbk-insure-health; // หักค่าจำเป็น 10000 และที่ส่งกองทุน
	var net1 = netIncome - reduce; // รายได้สุทธิ หักลดหย่อน
	var edu = ''; // ลดพิเศษการศึกษา 2 เท่าที่สนับสนุน แต่ไม่เกิน 20% รายได้สุทธิ
	if(e0*2>net1*0.1 && net1>0){edu = net1*0.1;}
	else{edu=e0*2;}
	var donate=''; // บริจาคตามที่จ่ายจริง แต่ไม่เกิน 10% รายได้สุทธิที่หักการศึกษาแล้ว
	if(d0>(net1-edu)*0.1 && net1>0){donate=(net1-edu)*0.1;}
	else{donate=d0;}
     var net2 = net1 - edu - donate ; // รายได้สุทธิจริง ก่อนคำนวณภาษี
     var i=net2;
	var t='';
	if(i<150000 || i==150000){t='0';}
      else if(i<300000 || i==300000){t=i* 0.05;}
	else if(i<500000 || i==500000){t=(150000*0.05)+((i-300000)*0.1);}
	else if(i<750000 || i==750000){t=(150000*0.05)+(200000*0.1)+((i-500000)*0.15);}
	else if(i<1000000 || i==1000000){t=(150000*0.05)+(200000*0.1)+(250000* 0.15)+((i-750000)*0.2);}
	else if(i<2000000 || i==2000000){t=(150000*0.05)+(200000*0.1)+(250000* 0.15)+(250000*0.2)+((i-1000000)*0.25);}
	else if(i<5000000 || i==5000000){t=(150000*0.05)+(200000*0.1)+(250000* 0.15)+(250000*0.2)+(1000000*0.25)+((i-2000000)*0.3);}
	else if(i>5000000){t=(150000*0.05)+(200000*0.1)+(250000* 0.15)+(250000*0.2)+(1000000*0.25)+(3000000*0.3)+((i-5000000)*0.35);}

	document.getElementById('netIncome').innerHTML = 'รายได้หักค่าใช้จ่าย<br>' + Number(netIncome.toFixed(2)).toLocaleString() + ' บาท'; //หัก 100000 กับกองทุน 
	document.getElementById('reduce').innerHTML = 'ลดหย่อนส่วนตัว<br>' + Number(reduce.toFixed(2)).toLocaleString() + ' บาท'; //หักลดหย่อนพ่อแม่ลูก ช๊อปดี
	document.getElementById('net1').innerHTML = 'คงเหลือ<br>' + Number(net1.toFixed(2)).toLocaleString() + ' บาท'; 
	document.getElementById('e0').innerHTML = 'ลดหย่อนการศึกษา<br>' + Number(edu.toFixed(2)).toLocaleString() + ' บาท';	document.getElementById('d0').innerHTML = 'ลดหย่อนบริจาค ' + Number(donate.toFixed(2)).toLocaleString() + ' บาท'; 
	document.getElementById('net2').innerHTML = 'รายได้สุทธิสำหรับคิดภาษี ' + Number(net2.toFixed(2)).toLocaleString() + ' บาท'; 
	document.getElementById('otherIncome').innerHTML = 'รายได้พึงประเมิน<br>' + Number(otherIncome.toFixed(2)).toLocaleString() + ' บาท';
	if((t-p-dc-p2)<0){
		document.getElementById('tax').innerHTML = '<b>ได้รับเงินภาษีคืน<br>' + Number((-1*(t - p - dc - p2)).toFixed(2)).toLocaleString() + ' บาท</b><br><br>';
		alert("ได้รับเงินภาษีคืน " + Number((-1*(t - p - dc - p2)).toFixed(2)).toLocaleString() + " บาท");}
	else{document.getElementById('tax').innerHTML = '<b>ภาษีที่ต้องชำระ<br>' + Number((t - p - dc - p2).toFixed(2)).toLocaleString() + ' บาท</b><br><br>';
		alert('ภาษีที่ต้องชำระ ' + Number((t - p - dc - p2).toFixed(2)).toLocaleString() + ' บาท');}

}

function fill(value){
	var year = value;
	if(year=="2566a"){
	document.getElementById('gbk').value='';
	document.getElementById('dr').value='';
	document.getElementById('d').value='';
	document.getElementById('dc').value='';
	document.getElementById('r').value='980,940';
	document.getElementById('m').value='72,000';
	document.getElementById('r1').value='136,691';
	document.getElementById('r2').value='60,000';
	document.getElementById('r3').value='';
	document.getElementById('r5').value='40,000';
	document.getElementById('r4').value='60,000';
	document.getElementById('donate').value='5,000';
	document.getElementById('paid').value='7,500';}

	else if(year=="2566b"){
	document.getElementById('m').value='';
	document.getElementById('r').value='650,370';
	document.getElementById('gbk').value='18,251';
	document.getElementById('dr').value='24';
	document.getElementById('d').value='22,129';
	document.getElementById('dc').value='5,368';
	document.getElementById('r3').value='30,000';
	document.getElementById('r4').value='60,000';
	document.getElementById('r5').value='36,564';
	document.getElementById('r2').value='';
	document.getElementById('paid').value='24,711';
	document.getElementById('paid2').value='2,147';
	document.getElementById('donate').value='';
	document.getElementById('r1').value='';}

	else if(year=="reset"){
	document.getElementById('m').value='';
	document.getElementById('r').value='';
	document.getElementById('gbk').value='';
	document.getElementById('dr').value='';
	document.getElementById('d').value='';
	document.getElementById('dc').value='';
	document.getElementById('r3').value='';
	document.getElementById('r4').value='';
	document.getElementById('r5').value='';
	document.getElementById('r2').value='';
	document.getElementById('paid').value='';
	document.getElementById('paid2').value='';
	document.getElementById('donate').value='';
	document.getElementById('r1').value='';
	document.getElementById('netIncome').innerHTML = ''; 
	document.getElementById('reduce').innerHTML = ''
	document.getElementById('net1').innerHTML = ''; 
	document.getElementById('e0').innerHTML = ''; 
	document.getElementById('net2').innerHTML = ''; 
	document.getElementById('otherIncome').innerHTML = '';
	document.getElementById('tax').innerHTML = '';}
}
