var pad;
var pf;
var stat;
var editor;
var pauser;
var ban;
var hint;
var ar = new Array(25);
var arp = new Array(25);
var sav = new Array(25);
var chk = new Array(25);
var checkpts = new Array(6);
var then = null;
var now = null;
var frt;
var min = sec = ms = pms = 0;
var timer = qsaved = csaved = 0;
var tired = qtired = ctired = 0;
var frames = qframes = cframes = 0;
var index = qindex = cindex = 0;
var rep = qrep = crep = 1;
var rflag = qflag = cflag = false;
var reps;
var dirs;
var ie = false;
var sp = ' ';
var endl = '\n';
var resp = "";
var key_left, key_right, key_up, key_down;
var kd_left, kd_right, kd_up, kd_down;
var progress = total = guys = level = moneyl = deaths = stop_loop = checkpoint = midpoint = setter = 0;
var tut = got_all_money = pausebutton = dead = can_advance = quicked = checker = bugs = editing = false;
var fromstart = true;
var rate = 100;

if(navigator.appName.indexOf("Microsoft") != -1)
{
	ie = true;
	sp = ' ';
	endl = '<br>';
}

for(var i=0; i<25; i++)
{
	ar[i] = new Array(80);
	arp[i] = new Array(80);
	sav[i] = new Array(80);
	chk[i] = new Array(80);
}

function startup()
{
    pad = document.getElementById("lev");
    pf = document.getElementById("playfield");
    stat = document.getElementById("statusField");
    editor = document.getElementById("editwindow");
    pauser = document.getElementById("pauser");
    ban = document.getElementById("banner");
    hint = document.getElementById("hint");

    var cookies = document.cookie.split(';');
    for (var i = 0; i < cookies.length; i++)
    {
        var cookie = cookies[i];
        while (cookie.charAt(0) == ' ') cookie = cookie.substring(1, cookie.length);
        if (cookie.indexOf('progress=') == 0)
            progress = cookie.substring('progress='.length, cookie.length);
    }
    if (progress != 0) showLevels();
	else saveCookie();
    load();
}
window.onload=startup;

function saveCookie()
{
	progress++;
	var date = new Date();
	date.setTime(date.getTime() + (31536000000));
	var expires = "; expires=" + date.toGMTString();
	document.cookie = "progress=" + progress + expires + "; path=/u/3107470";
	showLevels();
}

function speed()
{
	var s = document.getElementById("speed");
	switch(rate)
	{
		case 100: rate=50; s.className="red"; s.innerHTML = "FAST"; break;
		case 50: rate=10; s.className="red"; s.innerHTML = "<i>FASTER!</i>"; break;
		case 10: rate=100; s.className="ok"; s.innerHTML = "Normal"; break;
	}
}

function pause()
{
	if (stop_loop < 1)
	{
		if (!pausebutton)
		{
			pauser.innerHTML = "[Un(P)ause]";
			stat.innerHTML = "PAUSED<br>";
			stat.className = "gold";
			stop_loop = -1;
			clearTimeout(frt);
			pausebutton = true;
			pf.innerHTML = getPfString(true);// + getStString(); Commented out the status string for Murder Mystery
		}
		else
		{
			pauser.innerHTML = "[(P)ause]";
			stat.innerHTML = "<br>";
			stop_loop = 0;
			pausebutton = false;
			then = new Date() - timer;
			if (!tut) {key_left = key_right = key_up = key_down = 0;}
			frameLoop();
		}
	}
}
	
function showLevels()
{
	if (progress > 1) {if (progress != 3) document.getElementById("mid1").className="here";
	if (progress > 2) {document.getElementById("tut1").className="here";
	if (progress > 4) {document.getElementById("lev2").className="here";
	if (progress > 5) {if (progress != 7) document.getElementById("mid2").className="here";
	if (progress > 6) {document.getElementById("tut2").className="here";
	if (progress > 8) {document.getElementById("lev3").className="here";
	if (progress > 9) {if (progress !=11) document.getElementById("mid3").className="here";
	if (progress >10) {document.getElementById("tut3").className="here";
	if (progress >12) {document.getElementById("lev4").className="here";
	if (progress >13) {if (progress !=15) document.getElementById("mid4").className="here";
	if (progress >14) {document.getElementById("tut4").className="here";
	if (progress >16) {document.getElementById("lev5").className="here";
	if (progress >17) {if (progress !=19) document.getElementById("mid5").className="here";
	if (progress >18) {document.getElementById("tut5").className="here";
	if (progress >20) {document.getElementById("lev6").className="here";
	if (progress >21) {if (progress !=23) document.getElementById("mid6").className="here";
	if (progress >22) {document.getElementById("tut6").className="here";
	if (progress >24) {document.getElementById("lev7").className="here";
	if (progress >25) {if (progress !=27) document.getElementById("mid7").className="here";
	if (progress >26) {document.getElementById("tut7").className="here";
	if (progress >28) {document.getElementById("lev8").className="here";
	if (progress >29) {if (progress !=31) document.getElementById("mid8").className="here";
	if (progress >30) {document.getElementById("tut8").className="here";
	if (progress >28) {document.getElementById("lev9").className="here";
	if (progress >29) {if (progress !=33) document.getElementById("mid9").className="here";
	if (progress >30) {document.getElementById("tut9").className="here";
	}}}}}}}}}}}}}}}}}}}}}}}}}}
}

onereps = [2,5,1,5,1,2,4,37,1,30,12,7,5,2,23,25,6,1,45,4,2,1,11,38,1,48,16,1,3,2,14,3,31,9,6,26,1,2,29,4,5,25,8,4,47,9,21,1,10,4,24,2,1,2,18,4,31,30,1,56,3,11,6,44,4,3,4,1,11,7,1,4,18,1,23,1,22,18,36,12];
onedirs = [4,2,3,2,4,2,0, 2,0, 2, 0,1,2,4, 1, 0,1,3, 1,3,1,4, 0, 1,4, 0, 1,2,1,3, 1,2, 0,2,0, 2,3,2, 0,2,3, 2,0,4, 0,1, 2,3, 2,4, 2,0,4,2, 1,0, 1, 2,0, 1,3, 1,0, 2,0,3,1,4, 0,1,3,1, 2,3, 1,4, 0, 1, 2, 0];

tworeps = [1,2,1,4,1,2,1,8,1,2,1,9,1,8,1,6,4,1,1,1,8,2,4,5,1,15,1,6,1,4,1,12,1,3,6,7,8,4,3,19,1,9,4,13,7,6,1,7,2,1,8,8,4,7,1,4,1,11,1,4,2,2,14,7,1,5,1,4,1,24,1,1,21,3,29,4,3,19,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,3,6,1,8,5,5,1,1,5,4,4,2,6,6,1,3,1,3,1,3,4,1,11,1,9,6,12,7,1,7,1,1,3,1,3,1,4,1,11,1,26,1];
twodirs = [4,2,3,2,4,2,3,1,0,1,4,1,4,2,4,2,1,3,2,3,1,2,0,1,3, 1,3,0,3,1,4, 1,4,2,3,2,0,2,3, 2,4,2,0, 2,0,2,3,2,0,4,2,1,4,1,3,2,4, 1,3,1,3,4, 2,1,3,1,4,1,0, 1,4,2, 0,2, 0,2,4, 0,4,0,4,0,4,0,4,0,4,0,4,0,4,0,4,0,4,0,4,0,4,0,4,0,4,0,4,0,1,3,1,2,1,2,0,3,2,3,1,3,2,4,0,4,0,4,0,1,4, 2,3,2,3, 1,3,1,3,1,4,0,4,0,4,2,4, 2,3, 2,4];

thrreps = [11,2,4,3,7,2,3,5,7,2,3,5,6,2,8,2,7,2,4,5,6,1,1,3,1,3,4,3,16,3,3,2,8,13,20,16,18,24,38,3,6,2,18,2,1,7,1,8,2,1,4,1,21,1,20,1,31,18,2,9,11,15,2,23,1,15,36,1,1,17,1,4,6,8,1,2,2,2,14,3,24,2,4,3,6,2,69,6,3,4,4,3,4,6,44,9,31,2,3,17,2,12,1,3,1,3,6,11,1,3,1,8,3,2,1,3,1,8,8,2,1,1,3,1,7,4,3,1,3,1,9,9,3,3,2,1,3,1,17,4,3,4,1,5];
thrdirs = [ 2,0,1,0,1,0,2,0,2,0,1,0,1,0,2,0,1,0,2,1,3,4,2,4,2,4,2,0, 2,1,2,1,2, 1, 2, 1, 2, 1, 2,1,2,0, 2,1,3,2,4,2,1,3,1,4, 2,4, 0,4, 2, 1,0,3, 4, 1,0, 1,4, 0, 1,3,1, 2,4,1,2,1,3,2,3,0, 1,0, 2,0,2,3,1,3, 2,3,2,4,0,3,1,4, 1,3, 2,0,3, 2,0, 1,3,1,4,1,0, 1,3,1,4,1,0,1,3,1,4,1,2,0,2,3,2,4,2,0,2,3,2,4,2,0,2,0,2,3,2,4, 2,3,2,4,1,2];

foureps = [1,13,1,2,4,1,2,4,1,2,4,14,3,2,22,17,1,1,1,21,8,8,2,3,3,2,1,2,1,5,3,2,1,6,3,2,1,3,4,1,1,2,6,4,3,10,7,1,8,1,1,3,11,4,11,14,5,5,7,1,18,1,3,4,4,4,4,4,4,4,4,4,4,4,2,1,2,1,1,28,2,30,1,1,6,1,1,9,2,39,34,3,1,12,1,3,1,2,1,19,7,1,1,2,9,5,9,9,24,9,1,11,4,1,1,1,13,10,33,2,2,4,1,1,3,1,1,3,1,1,3,1,1,8,3,5,4,6,11,5,4,10,4,2,5,8,1,2,8,1,7,1,5,1,7,7,1,1,3,1,1,4,2,10,6,3,3,2,1,10,21,8,2,3,3,2,1,8,2,7,2,1,5,5,1,6,6,4,1,1,1,1,1,1,7];
foudirs = [4, 0,1,0,2,1,0,2,1,0,2, 3,0,2, 0, 3,1,3,2, 4,0,2,0,3,0,3,0,3,1,3,2,0,2,3,1,0,1,0,3,2,4,1,4,2,4, 2,3,2,3,1,2,3, 2,1, 0, 2,1,2,1,0, 2,3,0,2,0,1,0,2,0,1,0,2,0,1,2,4,2,1,0, 2,0, 1,2,0,1,3,1,2,0, 2, 1,4,0, 1,4,1,3,1,3, 1,2,4,3,0,2,0,1,2, 1,2,4, 0,3,2,3,2, 1, 2, 0,2,3,2,1,0,2,1,0,2,1,0,2,1,0,2,3,2,3,2, 0,1,4, 2,3,2,4,2,3,4,2,3,2,4,1,4,2,3,2,1,3,2,1,3,0, 2,1,4,2,0,2, 0, 3,2,0,2,1,0,1,3,2,4,1,4,2,1,2,0,2,3,1,3,2,3,1,2,3];

fivreps = [11,3,1,3,1,4,1,9,2,1,6,1,1,3,2,4,4,1,3,1,3,1,6,3,3,3,1,2,1,8,1,3,7,1,1,10,2,6,2,5,2,12,5,1,1,1,1,1,18,2,1,2,4,3,4,1,8,11,3,18,2,16,1,2,1,2,4,15,1,1,19,5,2,4,4,1,7,1,7,1,7,1,7,1,7,1,7,1,7,9,2,7,1,1,12,6,2,4,1,1,17,30,1,5,7,2,6,4,4,6,1,2,1,3,9,1,1,36,2,24,1,2,1,13,1,1,1,2,1,11,1,3,1,9,1,2,1,12,13,1,1,1,1,4,10,2,4,1,11,1,2,1,21,3,1,34,2,7,3,3,3,3,3,3,6,4,2,21,10,3,9,3,1,4,6,3,3,2,6,2,12,14,7,10,1,5,3,6,3,10,1,1,1,1,1,4];
fivdirs = [ 3,2,3,2,3,2,4,2,0,3,2,1,4,2,4,2,0,3,2,3,2,4,1,0,4,1,3,1,3,1,4,1,0,1,3, 1,4,1,3,1,2, 4,2,1,2,1,2,1, 2,3,2,0,1,3,1,4,1, 2,3, 2,0, 2,3,2,4,1,0, 2,1,4, 1,3,4,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,0,2,1,2,4,1, 0,2,0,2,4,2, 0, 2,4,0,2,3,2,1,0,2,3,1,3,0,2,4,2, 0,3, 1,3,2,3, 1,3,2,4,1,4, 2,4,1,4,2,3,1,3, 0, 2,3,1,4,2,0, 2,0,2,4, 1,4,2,4, 1,2,3, 2,1,2,1,2,1,2,1,2,3,2,0, 2, 1,3,2,1,4,1,2,3,1,0,1,0, 1, 2,3, 1,0,1,0,2,0, 2,1,2,1,2,4,2];

sixreps = [2,5,7,6,10,37,8,1,4,6,1,4,1,11,1,16,2,4,1,4,1,3,4,20,3,16,1,10,1,10,1,6,1,2,1,6,1,2,1,4,1,3,1,8,2,1,3,1,2,17,4,3,1,2,1,5,6,7,6,10,2,15,1,6,9,3,11,3,11,3,11,3,11,3,13,1,18,1,1,4,12,8,6,1,4,1,4,1,27,1,16,2,4,1,4,1,2,1,11,1,8,5,1,10,1,6,1,5,4,1,8,4,1,8,6,1,5,1,8,1,7,10,2,8,6,2,1,68,2,8,8,5,14,16,1,52,5,10,3,9,1,6,9,3,11,3,11,3,11,3,11,3,13,1,39,13,22,1,8,1,8,1,6,2,22,22,2,77,1,2,7,5,2,4];
sixdirs = [4,2,0,2, 0, 2,1,3,2,0,3,1,3, 0,3, 2,4,1,4,2,4,1,4, 2,0, 2,3, 1,3, 2,3,1,0,1,3,2,0,2,3,1,0,1,3,2,1,3,1,3,2, 0,1,2,4,2,4,2,1,4,2, 1,0, 1,3,0,2,0, 1,0, 2,0, 1,0, 2,0, 1,2, 1,3,4,0, 1,2,0,3,1,3,2,3, 0,3, 1,4,2,4,1,4,2,4, 1,0,2,1,4, 1,3,1,4,1,2,3,1,2,4,1,2,3,1,3,2,0,2, 0,3,1,0,4,3, 0,1,3,1,2, 1, 2,3, 2,0, 2,0,1,3,0,2,0, 1,0, 2,0, 1,0, 2,0, 1,2, 1, 2, 1,2,1,2,1,2,1,4, 2, 1,3, 2,4,2,4,1,4,2];

sevreps = [3,1,15,17,7,11,1,1,1,1,1,1,8,4,6,3,2,21,6,1,21,1,8,12,6,1,5,4,8,6,2,8,6,2,10,9,4,10,9,5,10,9,5,13,12,13,12,14,14,15,18,1,2,12,6,4,2,4,7,3,18,1,1,1,1,1,1,1,3,1,1,2,13,3,3,8,3,11,1,5,2,3,2,10,12,7,9,10,10,10,12,13,29,1,2,1,21,2,2,1,1,13,1,16,1,30,2,1,3,1,28,3,1,28,4,13,2,8,31,13,3,2,7,2,4,13,34];
sevdirs = [2,1, 0, 2,0, 2,1,2,1,2,1,2,1,2,1,3,2, 0,2,1, 0,2,3, 2,1,0,2,0,1,2,0,1,2,0, 1,2,0, 1,2,0, 1,2,0, 1, 2, 1, 2, 1, 2, 1, 2,0,4, 2,3,2,0,4,2,0, 2,1,2,1,2,1,2,1,2,3,1,3, 2,3,0,2,1, 2,4,0,1,3,1, 0, 2,1,2, 1, 2, 1, 2, 1, 2,3,1,3, 2,3,1,4,2, 1,4, 0,3, 1,3,0,1,4, 0,1,3, 0,1, 0,2,1, 0, 3,1,0,2,0,1, 4, 2];

eigreps = [36,14,16,14,2,4,12,3,5,1,9,1,2,2,1,1,1,32,1,19,2,6,3,11,5,1,11,1,2,7,1,2,1,1,2,1,5,1,20,21,1,4,1,7,3,12,1,5,1,2,7,1,2,2,1,1,1,23,2,4,13,14,1,3,2,2,1,2,3,1,7,3,7,1,8,1,14,1,51,5,7,1,1,2,1,1,2,1,1,1,3,2,19,1,2,4,4,20,2,2,1,1,2,2,2,1,1,7,30,2,4,1,6,1,11,28,1,5,1,4,1,41,2,4,1];
eigdirs = [ 2, 0, 2, 1,3,0, 2,3,2,4,1,3,2,1,2,1,3, 2,3, 2,3,1,0, 1,2,3, 2,4,0,2,3,1,2,1,2,3,1,3, 1, 2,3,2,4,2,0, 2,3,2,4,0,1,3,2,1,2,1,3, 1,3,1, 0, 1,4,2,4,1,2,3,1,3,2,0,2,3,0,3, 1,4, 1,3,2,4,1,2,4,1,2,4,2,4,0,1, 2,4,0,2,4, 2,0,3,2,1,0,4,2,1,0,2, 1,3,1,4,1,3, 2, 1,3,2,4,0,4, 0,1,4,2];

ninreps = [6,2,1,2,1,2,2,1,1,1,2,5,1,1,6,4,1,1,1,2,1,5,1,3,1,1,1,8,5,2,5,1,5,7,1,1,19,2,19,4,1,8,9,1,2,13,2,4,2,3,4,1,36,2,1,1,2,2,6,9,32,13,6,1,7,1,5,28,6,1,1,2,1,2,1,2,1,2,1,2,1,1,5,1,2,3,1,2,1,1,2,1,1,2,1,1,2,1,2,1,1,1,3,4,2,6,1,6,1,13,6,1,5,4,2,2,2,2,2,2,2,2,2,3,2,7,6,14,6,6,7,10,6,1,6,2,4,1,2,11,6,24,1,1,11,3,3,6,15,2,2,13,4,3,3,4,2,5,2,2,1,2,3,2,1,6,4,3,8,3,12,1,13,3,1,2,2,2,1,2,4,2,5,2,1,1,2,2,1,2,1,1,1,2,1,2,1,1,1,1,1,11,1,1,14,3,3,1,2,1,2,1,12,1,2,2,10,1,4,15,1,2,1,1,1,1,2,1,10,3,17,12,1,17,2,11,2,2,9,1,18,11,14,1,6,2,1,2,1,2,1,2,1,2,1,2,1,3,5,1,15,6,5,3,1,8,1,8,1,8,1,16,12,1,6,11,1,4,6,5,3,2,4,1,4,1,6];
nindirs = [0,2,1,2,1,2,3,2,4,1,3,1,3,2,0,4,1,4,2,4,2,0,2,0,2,0,2,3,1,4,2,3,1,2,1,2, 1,4, 2,4,1,0,1,4,2, 0,1,2,0,1,2,4, 1,3,2,4,1,4,2,1, 2, 3,2,4,1,4,2, 1,2,3,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,1,2,0,1,2,0,1,2,0,1,2,0,1,2,3,2,1,2,1,3,1,4,0,2, 1,3,2,1,2,1,2,1,2,1,2,1,2,1,2,3,1,2, 1,2,3,1, 3,2,4,1,4,2,4,2, 1,2, 0,1,2, 1,3,4,2, 3,1,2, 1,2,3,0,3,0,3,2,1,4,2,4,1,2,0,1,2,1,2, 1,4, 1,3,1,4,1,3,1,4,1,3,1,3,2,4,2,1,2,1,2,1,3,2,4,2,4,2,4,2,4, 1,4,0, 1,3,2,1,2,1,2,1, 0,1,0,2, 0,1,0, 2,3,2,4,2,1,3,1,4, 2,0, 2, 1,3, 0,4, 1,4,0,1,3, 1, 0, 1,3,2,1,2,1,2,1,2,1,2,1,2,1,2,0,2,3, 1,2,0,2,4,1,4,2,3,1,4, 2, 0,3,1, 2,3,2,0,4,2,3,0,3,2,0,2];

function copyM(arrrep, arrdir, num)
{
	reps = new Array(num);
	dirs = new Array(num);
	total = num;
	index = 0;
	rep = 1;
	for (var i=0; i<num; i++)
	{
		reps[i]=arrrep[i];
		dirs[i]=arrdir[i];
	}
}

function getTut(lvl)
{
	tut = fromstart = true;
	level = lvl;
	stat.innerHTML = "<br>";
	key_left = key_right = key_up = key_down = 0;
	switch(lvl)
	{
		case  1: copyM(onereps, onedirs, onereps.length); break;
		case  3: copyM(tworeps, twodirs, tworeps.length); break;
		case  5: copyM(thrreps, thrdirs, thrreps.length); break;
		case  7: copyM(foureps, foudirs, foureps.length); break;
		case  9: copyM(fivreps, fivdirs, fivreps.length); break;
		case 11: copyM(sixreps, sixdirs, sixreps.length); break;
		case 13: copyM(sevreps, sevdirs, sevreps.length); break;
		case 15: copyM(eigreps, eigdirs, eigreps.length); break;
		case 17: copyM(ninreps, nindirs, ninreps.length); break;
	}
	load();
}

function getLvl(lvl)
{
	tut = false;
	fromstart = true;
	level = lvl;
	stat.innerHTML = "<br>";
	load();
}

function displayHint()
{
	hint.className = "here";
	if (level > 0)
	{
		var actual = level % 2 == 0 ? level / 2 : (level + 1) / 2;
		hint.innerHTML = document.getElementById("hint" + actual).innerHTML;
	}
}

function getPfCh(x,y)
{
	ch = ar[y][x];
	     if(ch == '>') ch = '&gt;';
	else if(ch == '<') ch = '&lt;';
	else if(ch == '&') ch = '&amp;';
	return ch;
}

function getPfString(paused)
{
	var str = "";
	for(var y=0; y<25; y++)
	{
			// Lines below commented out for the Murder Mystery
		for(var x=0; x<80; x++)
		{
			var c = getPfCh(x,y);
			if (c=='I') str+= "<span class=red>I</span>";
			//else if (c=='E'||c=='e'||c=='$') str+= "<span class=gold>"+c+"</span>";
			else if (paused)
            {
		//Modified for Murder Mystery
                if (c=='O') str+= "<span class=violetHighlightTwo>"+c+"</span>";
                //if (c=='~') str+= "<span class=violetHighlight>"+c+"</span>";
                //else if (c=='@') str+= "<span class=violetHighlightTwo>"+c+"</span>";
                //else if (c=='`') str+= "<span class=steelHighlight>"+c+"</span>";
                else str+= c;
            }
			//else if (c=='M'||c=='D'||c=='L'||c=='!') str+= "<span class=red>"+c+"</span>";
			//else if (c=='C'||c=='H'||c=='U'||c=='K'||c=='A'||c=='T')
			//	str+= "<span class=darkGreen>"+c+"</span>";
			else if (c=='0'||c=='1'||c=='2'||c=='3'||c=='4'||c=='5'||c=='6'||c=='7'||c=='8'||c=='9')
				str+= "<span class=tan>"+c+"</span>";
			else if (c=='&lt;'||c=='&gt;') str+= "<span class=brown>"+c+"</span>";
			else if (c=='['||c==']'||c=='{'||c=='}') str+= "<span class=blue>"+c+"</span>";
			else if (c=='d'||c=='b') str+= "<span class=purple>"+c+"</span>";
			else if (c=='O'||c=='*') str+= "<span class=lightBlue>"+c+"</span>";
			else if (c=='('||c==')'||c=='`') str+= "<span class=steel>"+c+"</span>";
			else if (c=='@'||c=='~') str+= "<span class=violet>"+c+"</span>";
			else if (c=='&amp;') str+= "<span class=green>"+c+"</span>";
			else if (c=='%') str+= "<span class=maroon>%</span>";
			else if (c=='X') str+= "<span class=lightAqua>X</span>";
			else if (c=='x') str+= "<span class=aqua>x</span>";
			else if (c==';') str+= "<span class=gray>;</span>";
			else str+= c;
		}
		str += "<br>";
	}
	return str;
}

function replace(a,b)
{
	for(var y=0; y<25; y++)
	for(var x=0; x<80; x++)
		if(ar[y][x]==a)
			arp[y][x]=b;
}

function swap(a,b)
{
	for(var y=0; y<25; y++)
	for(var x=0; x<80; x++)
	{
		if(ar[y][x]==a)
		{
			arp[y][x]=b;
			ar[y][x]=sp;
		}
		else if(ar[y][x]==b)
		{
			arp[y][x]=a;
			ar[y][x]=sp;
		}
	}
}

function getStString()
{
	var s = (sec<10)?"0":"";
	var m = (min<10)?"0":"";
	var hud = "<span class=black>[Clock: "+m+min+":"+s+sec+":"+ms+"]</span> ";
	hud += "<span class=darkGreen>[Checkpoints: "+checkpoint+"]</span> ";
	hud += "<span class=blue>[Deaths: "+deaths+"]</span> ";
	hud += "<span class=red>[I's in Play: "+guys+"]</span> ";
	hud += "<span class=gold>[$'s Left: "+moneyl+"]</span>";
	return hud;
}

function fetchLevel()
{
	if (level == 0)
	{
		resp = pad.value;
	}
	else if (ie)
	{
		resp = parent[level-1].document.body.innerHTML;
	}
	else
	{
		resp = parent[level-1].document.body.textContent;
	}
	resp = resp.replace(/&amp;/g,'&');
	resp = resp.replace(/&gt;/g,'>');
	resp = resp.replace(/&lt;/g,'<');
	resp = resp.replace('<PRE>','');
	resp = resp.replace('</PRE>','');
	resp = resp.replace(/\r\n/g,'\n');
	resp = resp.replace(/ /g,sp);
}

function load()
{
	hint.className = "gone";
	checkpts = new Array(6);
	rflag = got_all_money = pausebutton = dead = can_advance = checker = false;
	tired = timer = qsaved = csaved = min = sec = ms = 0;
	deaths = frames = stop_loop = checkpoint = midpoint = 0;
	key_left = key_right = key_up = key_down = 0;
	kd_left = kd_right = kd_up = kd_down = 0;
	pauser.innerHTML = "[(P)ause]";
	pf.className = "ok";
	clearTimeout(frt);
	fetchLevel();
	var l = 0;
	var y = 0;
	var x = 0;
	for(y=0; y<25; y++)
	{
		for (x=0; x<81; x++)
		{
			var ch = resp.charAt(l++);
			if (l > resp.length) while (x<81) ar[y][x++]=sp;
			else if (ch == '\n') while (x<81) ar[y][x++]=sp;
			else if (x == 80) while (l < resp.length && resp.charAt(l++) != '\n');
			else ar[y][x]=ch;
		}
	}
	if (fromstart) quickSave();
	else
	{
		quicked = false;
		timer = 0;
		then = new Date();
	}
	frameLoop();
}

function restart()
{
	if (checkpoint) checkLoad();
	else
	{
		index = 0;
		rep = 1;
		stat.innerHTML = "RESTART<br>";
		stat.className = "lightGreen";
		load();
	}
}

function checkSave()
{
	checker = false;
	if (stop_loop < 1)
	{
		checkpoint++;
		setter = 0;
		stat.innerHTML = "CHECKPOINT!!!<br>";
		stat.className = "darkGreen";
		copyA(chk, ar);
		cframes = frames;
		cindex = index;
		crep = rep;
		ctired = tired;
		cflag = rflag;
		csaved = (quicked)?qsaved+timer:csaved+timer;
		quicked = false;
		timer = 0;
		then = new Date();
	}
}

function quickSave()
{
	if (stop_loop < 1)
	{
		if (!fromstart)
		{
			setter = 0;
			stat.innerHTML = "QUICK SAVE<br>";
			stat.className = "red";
		}
		else fromstart = false;
		copyA(sav, ar);
		qframes = frames;
		qindex = index;
		qrep = rep;
		qtired = tired;
		qflag = rflag;
		qsaved = (quicked)?qsaved+timer:csaved+timer;
		quicked = true;
		timer = 0;
		then = new Date();
	}
}

function checkLoad()
{
	setter = 0;
	pauser.innerHTML = "[(P)ause]";
	stat.innerHTML = "LOAD CHECKPOINT<br>";
	stat.className = "blue";
	copyA(ar, chk);
	frames = cframes;
	index = cindex;
	rep = crep;
	tired = ctired;
	rflag = cflag;
	quicked = false;
	timer = 0;
	then = new Date();
	pausebutton = false;
	pf.className = "ok";
	key_left = key_right = key_up = key_down = 0;
	kd_left = kd_right = kd_up = kd_down = 0;
	if (stop_loop)
	{
		stop_loop = 0;
		frameLoop();
	}
}

function quickLoad()
{
	setter = 0;
	pauser.innerHTML = "[(P)ause]";
	stat.innerHTML = "QUICK LOAD<br>";
	stat.className = "blue";
	copyA(ar, sav);
	frames = qframes;
	index = qindex;
	rep = qrep;
	tired = qtired;
	rflag = qflag;
	quicked = true;
	timer = 0;
	then = new Date();
	pausebutton = false;
	pf.className = "ok";
	key_left = key_right = key_up = key_down = 0;
	kd_left = kd_right = kd_up = kd_down = 0;
	if (stop_loop)
	{
		stop_loop = 0;
		frameLoop();
	}
}

function copyA(to,from)
{
	var x,y;
	for(y=0; y<25; y++)
	for(x=0; x<80; x++)
		to[y][x] = from[y][x];
}

function frameLoop()
{
	if (stop_loop) return;
	if (tut)
	{
		key_left=key_right=key_up=key_down=0;
		if (index < total)
		{
			var dir = dirs[index];
			switch (dir)
			{
				case 1: key_left=1; break;
				case 2: key_right=1; break;
				case 3: key_up=1; break;
				case 4: key_down=1; break;
				default: break;
			}
			if (rep < reps[index]) rep++;
			else
			{
				rep=1;
				index++;
			}
		}
		else
		{
			stop_loop=3;
		}
	}
	now = new Date();
	timer = now - then;
	var display = timer;
	if (quicked) display += qsaved;
	else display += csaved;
	var time1 = Math.floor(display / 1000);
	var time2 = Math.floor(display / 100);
	min = Math.floor(time1 / 60);
	sec = (time1) % 60;
	ms = (time2) % 10;
	pollInput();
	copyA(arp, ar);
	if (rflag)
	{
		swap('{','}');
		swap('[',']');
		swap('<','>');
		swap('(',')');
		rflag = false;
	}
	doFrame1();
	if (frames == 8)
	{
		doFrame8();
		frames = 0;
	}
	frames++;
	copyA(ar, arp);
	pf.innerHTML = getPfString(false);// + getStString(); Commented out the status string for Murder Mystery
	if (moneyl == 0)
	{
		got_all_money = true;
	}
	else
	{
		got_all_money = false;
	}
	if (tired)
	{
		tired++;
		if(tired>2) tired=0;
	}
	if (!stop_loop)
	{
		if (ie) frt = setTimeout("frameLoop()",5)
		else frt = setTimeout("frameLoop()",rate)
	}
	if (checker) checkSave();
	if (midpoint == 1)
	{
		setter = 0;
		stat.innerHTML = "MIDPOINT!!!<br>";
		stat.className = "red";
		midpoint++;
	}
}
	
var x = 0;

function isEnemy(x)
{
	switch(x)
	{
		case '[':
		case ']':
		case '{':
		case '}':
		case '%':
			return true;
	}
	return false;
}

function canfall(x)
{
	switch(x)
	{
		case 'I':
		case '[':
		case ']':
		case 'O':
		case '%':
		case '$':
			return true;
	}
	return false;
}

function conveys(x)
{
	switch(x)
	{
		case 'I':
		case '[':
		case ']':
		case 'O':
		case '%':
		case '$':
			return true;
	}
	return false;
}

function probe(x,y,ch)
{
	if (y >= 25 || y < 0 || x >= 80 || x < 0) return true;
	var ob = ar[y][x];
	var ob1 = arp[y][x];
	switch(ch)
	{
		case 'I':
			if(ob == 'E')
			{
				win();
				return false;
			}
			else if(ob == '$')
			{
				arp[y][x] = sp;
				return false;
			}
			else if(ob == '0')
			{
				return true;
			}
			else if(isEnemy(ob))
			{
				die();
				return true;
			}
			else if(ob == 'O')
			{
				var dir=0;
				if(key_left) dir--;
				else if(key_right) dir++;
				if(dir)
				{
					if(probe(x,y+1,ob) && !probe(x+dir,y,ob) && ar[y][x-dir]=='I')
					{
						arp[y][x+dir] = ob;
						arp[y][x] = sp;
							if(ar[y+1][x]==';')
							if (y < 23) arp[y+2][x]=sp; // spill
							tired = 1;
						return false;
					}
					else return true;
				}
				else return true;
			}
			break;
		case '<':
		case '>':
			if(ob == "I") return false;
			break;
		case '}':
		case '{':
		case ']':
		case '[':
			var d = (ch=='}'||ch==']')?1:-1;
			if(ob == 'O' || ob == '$')
			{
				if( probe(x,y+1,ob) && !probe(x+d,y,ob))
				{
					arp[y][x+d] = ob;
					return false;
				}
			}
			else if(ob == 'I')
			{
				die();
				return false;
			}
			break;
			default:
			break;
	}
	return !(ob==sp && ob1==sp);
}

// -- 1 -- 1 -- 1 --
function doFrame1()
{
	var x,y;
	dead = true;
	guys = moneyl = 0;
	if(key_left) key_left = 2;
	if(key_right) key_right = 2;
	if(key_up) key_up = 2;
	if(key_down) key_down = 2;

	document.getElementById("xcoord").value = "";/////////////////
	document.getElementById("ycoord").value = "";/////////////////

	for(y=0;y<25;y++) for(x=0;x<80;x++)
	{
		var ch = ar[y][x];
		if(ch=='I')
		{
			switch(level)
			{
			case 0: // Intro Level
				// Modified for Murder Mystery
				if (checkpoint == 0 && y == 15 && x == 67) checker = true;
				//if ((checkpoint == 0 && y == 2 && x == 76) ||
				//    (checkpoint == 1 && y == 8 && x == 9)) checker = true;
				break;
			case 1: // Level 1
				if ((checkpoint == 0 && y == 1 && x == 79) ||
				    (checkpoint == 1 && y == 9 && x == 39) ||
				    (checkpoint == 2 && y == 12 && x == 49)) checker = true;
				if (!midpoint && y == 12 && x == 39)
				{
					midpoint++;
					if (!tut && (progress == 1 || progress == 3)) saveCookie();
				}
				break;
			case 2: // Level 1 MID
				if (checkpoint == 0 && y == 12 && x == 49) checker = true;
				break;
			case 3: // Level 2
				if ((checkpoint == 0 && y == 2 && x == 46) ||
				    (checkpoint == 1 && y == 6 && x == 76) ||
				    (checkpoint == 2 && y == 19 && x == 31)) checker = true;
				if (!midpoint && y == 10 && x == 39)
				{
					midpoint++;
					if (!tut && (progress == 5 || progress == 7)) saveCookie();
				}
				break;
			case 4: // Level 2 MID
				if (checkpoint == 0 && y == 19 && x == 31) checker = true;
				break;
			case 5: // Level 3
				if ((checkpoint == 0 && y == 13 && x == 5) ||
				    (checkpoint == 1 && y == 1 && x == 69) ||
				    (checkpoint == 2 && y == 8 && x == 75) ||
				    (checkpoint == 3 && y == 10 && x == 71)) checker = true;
				if (!midpoint && y == 23 && x == 34)
				{
					midpoint++;
					if (!tut && (progress == 9 || progress == 11)) saveCookie();
				}
				break;
			case 6: // Level 3 MID
				if ((checkpoint == 0 && y == 8 && x == 75) ||
				    (checkpoint == 1 && y == 10 && x == 71)) checker = true;
				break;
			case 7: // Level 4
				if ((checkpoint == 0 && y == 0 && x == 12) ||
				    (checkpoint == 1 && y == 19 && x == 37)) checker = true;
				if (!midpoint && y == 9 && x == 40)
				{
					midpoint++;
					if (!tut && (progress == 13 || progress == 15)) saveCookie();
				}
				break;
			case 8: // Level 4 MID
				if (checkpoint == 0 && y == 19 && x == 38) checker = true;
				break;
			case 9: // Level 5
				if ((checkpoint == 0 && y == 9 && x == 11) ||
				    (checkpoint == 1 && y == 16 && x == 20) ||
				    (checkpoint == 2 && y == 14 && x == 35)) checker = true;
				if (!midpoint && y == 0 && x == 74)
				{
					midpoint++;
					if (!tut && (progress == 17 || progress == 19)) saveCookie();
				}
				break;
			case 10: // Level 5 MID
				if (checkpoint == 0 && y == 14 && x == 35) checker = true;
				break;
			case 11: // Level 6
				if ((checkpoint == 0 && y == 20 && x == 69) ||
				    (checkpoint == 1 && y == 17 && x == 55) ||
				    (checkpoint == 2 && y == 3 && x == 54)) checker = true;
				if (!midpoint && y == 15 && x == 11)
				{
					midpoint++;
					if (!tut && (progress == 21 || progress == 23)) saveCookie();
				}
				break;
			case 12: // Level 6 MID
				if (checkpoint == 0 && y == 3 && x == 54) checker = true;
				break;
			case 13: // Level 7
				if ((checkpoint == 0 && y == 9 && x == 24) ||
				    (checkpoint == 1 && y == 23 && x == 76) ||
				    (checkpoint == 2 && y == 2 && x == 4)) checker = true;
				if (!midpoint && ((y == 2 && x == 55) || (y == 17 && x == 62)))
				{
					midpoint++;
					if (!tut && (progress == 25 || progress == 27)) saveCookie();
				}
				break;
			case 14: // Level 7 MID
				if ((checkpoint == 0 && y == 23 && x == 76) ||
				    (checkpoint == 1 && y == 2 && x == 4)) checker = true;
				break;
			case 15: // Level 8
				if (checkpts[0] != 1 && y == 3 && x == 3) {checker = true; checkpts[0] = 1;}
				if (checkpts[1] != 1 && y == 4 && x == 57) {checker = true; checkpts[1] = 1;}
				if (checkpts[2] != 1 && y == 3 && x == 76) {checker = true; checkpts[2] = 1;}
				if (checkpts[3] != 1 && y == 15 && x == 77) {checker = true; checkpts[3] = 1;}
				if (checkpts[4] != 1 && y == 21 && x == 23) {checker = true; checkpts[4] = 1;}
				if (checkpts[5] != 1 && y == 15 && x == 29) {checker = true; checkpts[5] = 1;}
				if (!midpoint && y == 16 && x == 39 && checkpoint == 3)
				{
					midpoint++;
					if (!tut && (progress == 29 || progress == 31)) saveCookie();
				}
				break;
			case 16: // Level 8 MID
				if (checkpts[0] != 1 && y == 3 && x == 3) {checker = true; checkpts[0] = 1;}
				if (checkpts[2] != 1 && y == 3 && x == 76) {checker = true; checkpts[2] = 1;}
				if (checkpts[4] != 1 && y == 21 && x == 23) {checker = true; checkpts[4] = 1;}
				break;
			case 17: // Level 9
				if ((checkpoint == 0 && y == 13 && x == 0) ||
				    (checkpoint == 1 && y == 4 && x == 58) ||
				    (checkpoint == 2 && y == 19 && x == 70) ||
				    (checkpoint == 3 && y == 15 && x == 55) ||
				    (checkpoint == 4 && y == 21 && x == 0)) checker = true;
				if (!midpoint && y == 8 && x == 68)
				{
					midpoint++;
					if (!tut && (progress == 33 || progress == 35)) saveCookie();
				}
				break;
			case 18: // Level 9 MID
				if ((checkpoint == 0 && y == 19 && x == 70) ||
				    (checkpoint == 1 && y == 15 && x == 55) ||
				    (checkpoint == 2 && y == 21 && x == 0)) checker = true;
				break;
			} 
		}
		if(canfall(ch) && y == 24)
		{
			arp[y][x]=sp;
		}
		else if(ch.charCodeAt(0) >= '1'.charCodeAt(0) &&
		   ch.charCodeAt(0) <= '9'.charCodeAt(0))
		{
			if(y > 0 && ar[y-1][x] != sp)   // spill
				arp[y][x] = String.fromCharCode(ch.charCodeAt(0)-1);
		}
		else
		switch(ch)
		{
			case '0':
				arp[y][x]=sp;
				break;
			case '%':
				if(y<24 && ar[y+1][x]==";" && arp[y][x]=='%')
				{
					arp[y][x]=sp;
					if(y<23) arp[y+2][x]=ch;
				}
				else if(!probe(x,y+1,ch))
				{
					arp[y+1][x]=ch;
					arp[y][x]=sp;
				}
				else if((y<24) && (ar[y+1][x]=='I'))
				{
					arp[y+1][x]=ch;
					arp[y][x]=sp;
				}
				break;
			case ':':
				if(y > 0)
				{
					if(ar[y-1][x]=='O' || ar[y-1][x]=='%') arp[y][x]=';';
					else if(ar[y-1][x]=='X' || ar[y-1][x]=='.')
						arp[y][x]='.';
				}
				break;
			case ';':
				if(y > 0)
				{
					if(ar[y-1][x]!='O' && ar[y-1][x]!='%')
						arp[y][x]=':';
				}
				break;
			case 'O':
				if(y<24 && ar[y+1][x]==";" && arp[y][x]=='O')
				{
					arp[y][x]=sp;
					if(y<23) arp[y+2][x]=ch;
				}
				else if(!probe(x,y+1,ch))
				{
					arp[y+1][x]=ch;
					ar[y][x]=sp;
					arp[y][x]=sp;
				}
				break;
			case '.':
				arp[y][x]=':';
				break;
			case '&': // spill
				if (y>0) if (ar[y-1][x]=='0') arp[y][x]='0';
				if (y>0&&x<79) if (ar[y-1][x+1]=='0') arp[y][x]='0';
				if (x<79) if (ar[y][x+1]=='0') arp[y][x]='0';
				if (x<79&&y<24) if (ar[y+1][x+1]=='0') arp[y][x]='0';
				if (y<24) if (ar[y+1][x]=='0') arp[y][x]='0';
				if (y<24&&x>0) if (ar[y+1][x-1]=='0') arp[y][x]='0';
				if (x>0) if (ar[y][x-1]=='0') arp[y][x]='0';
				if (x>0&&y>0) if (ar[y-1][x-1]=='0') arp[y][x]='0';
				break;
			case '$':
				moneyl++;
				if(!probe(x,y+1,ch))
				{
					arp[y+1][x]=ch;
					arp[y][x]=sp;
				}
				else if((y<24) && (ar[y+1][x]=='I'))
				{
					arp[y][x]=sp;
				}
				break;
			case 'T':
				if(y>0 && ar[y-1][x]=='I')  // spill
				{
					if(x>0 && key_left && arp[y-1][x-1]=='I' && !probe(x-1,y,ch))
					{
						arp[y][x-1]=ch;
						arp[y][x]=sp;
					}
					else if(x<79 && key_right && arp[y-1][x+1]=='I' && !probe(x+1,y,ch))
					{
						arp[y][x+1]=ch;
						arp[y][x]=sp;
					}
				}
				break;
			case '^':
				if(y > 0 && ar[y-1][x]=='.')
					arp[y][x]='A';
				break;
			case 'A':
				if(y > 0 && (ar[y-1][x]==':' || ar[y-1][x]=='.') )
				{
					if(!probe(x,y+1,'O'))
					{
						arp[y+1][x]='O';
						arp[y][x]='^';
					}
				}
				break;
			case 'I':
				document.getElementById("xcoord").value += x+", ";/////////////////
				document.getElementById("ycoord").value += y+", ";/////////////////
				guys++;
				dead = false;
				if(!probe(x,y+1,ch))
				{
					arp[y+1][x]=ch;
					if (arp[y][x] == 'I')
						arp[y][x]=sp;
				}
				else
				{
					var fl = ar[y+1][x];
					if(fl=='('||fl==')'||tired)
						;
					else if(key_left)
					{
						if(!probe(x-1,y,ch))
						{
							arp[y][x-1] = ch;
							if (arp[y][x] == 'I')
								arp[y][x] = sp;
						}
						else if(!probe(x-1,y-1,ch))
						{
							arp[y-1][x-1] = ch;
							if (arp[y][x] == 'I')
								arp[y][x] = sp;
						}
					}
					else if(key_right)
					{
						if(!probe(x+1,y,ch))
						{
							arp[y][x+1] = ch;
							if (arp[y][x] == 'I')
								arp[y][x] = sp;
						}
						else if(!probe(x+1,y-1,ch))
						{
							arp[y-1][x+1] = ch;
							if (arp[y][x] == 'I')
								arp[y][x] = sp;
						}
					}
					else if(key_up)
					{
						if(y > 0 && ar[y-1][x]=='-' && !probe(x,y-2,ch))
						{
							arp[y-2][x]='I';
							if (arp[y][x] == 'I')
								arp[y][x]=sp;
						}
						else if(ar[y+1][x]=='"')
						{
							if(!probe(x,y-1,ch))
							{
								arp[y+1][x]=sp;
								arp[y][x]='"';
								arp[y-1][x]=ch;
							}
						}
					}
					else if(key_down)
					{
						if(ar[y+1][x]=='-' && !probe(x,y+2,ch))
						{
							arp[y+2][x]='I';
							if (arp[y][x] == 'I')
								arp[y][x]=sp;
						}
						else if(ar[y+1][x]=='"')
						{
							if(!probe(x,y+2,'"'))
							{
								arp[y+2][x]='"';
								arp[y+1][x]=ch;
								arp[y][x]=sp;
							}
						}
						else if(ar[y+1][x]=='~')
						{
							replace('@','0');
						}
						else if(ar[y+1][x]=='`')
						{
							rflag = true;
						}
					}
				}
				break;
			case 'x':
				if(y > 0 && ar[y-1][x]!=sp) // spill
				{
					arp[y-1][x]=sp;
					arp[y][x]='X';
				}
				break;
			case 'X':
				arp[y][x]='x';
				break;
			case 'e':
				if(got_all_money)
					arp[y][x]='E';
				break;
			case 'E':
				if(!got_all_money)
					arp[y][x]='e';
				break;
			case ')':
			case '(':
				if(y > 0) {
					var ob = ar[y-1][x];
					if(conveys(ob))
					{
						var dir = (ch==')')?1:-1;
						if(!probe(x+dir,y-1,ob))
						{
							arp[y-1][x]=sp;
							arp[y-1][x+dir]=ob;
						}
					}
				}
				break;
			case '<':
			case '>':
				var dir = (ch=='<')?-1:1;
				if(!probe(x+dir,y,ch))
				{
					arp[y][x]=sp;
					arp[y][x+dir]=ch;
					if(y > 0)
					{
						var ob = ar[y-1][x];
						if(conveys(ob) && !probe(x+dir,y-1,ob) )
						{
							arp[y-1][x] = sp;
							arp[y-1][x+dir] = ob;
						}
					}
				}
				break;
			case '{':
			case '}':
			case '[':
			case ']':
				var dir = (ch=='['||ch=='{')?-1:1;
				var gr = (ch=='['||ch==']');
				var od = (dir==1)?(gr?'[':'{'):(gr?']':'}');
					if(gr && (ar[y+1][x]=='('||ar[y+1][x]==')')) // spill
					;
				else
				{
					if(probe(x+dir,y,ch) && ((!gr)||probe(x,y+1,ch)) )
						arp[y][x]=od;
					else if(gr && !probe(x,y+1,ch))
					{
						arp[y][x]=sp;
						arp[y+1][x]=ch;
					}
					else
					{
						arp[y][x]=sp;
						arp[y][x+dir]=ch;
					}
				}
				break;
		}
	}
	if (dead) die();
}

// -- 8 -- 8 -- 8 --
function doFrame8()
{
	if (setter < 3) setter++;
	if (setter == 3) stat.innerHTML = "<br>";
	var x,y;
	for(y=0;y<25;y++) for(x=0;x<80;x++)
	{
		var ch = ar[y][x];
		switch(ch)
		{
			case '=':
				if(y > 0)
				{
					var ob = ar[y-1][x];
					if(ob != sp && ob != 'I')
					{
						if(!probe(x,y+1,ob))
							arp[y+1][x] = ob;
					}
				}
				break;
			case 'd':
			case 'b':
				var od = (ch=='d')?'b':'d';
				var dir = (ch=='d')?-1:1;
				{
					if(probe(x+dir,y,ch))
						arp[y][x]=od;
					else
					{
						arp[y][x]=sp;
						arp[y][x+dir]=ch;
					}
				}
				break;
		}
	}
}

function die()
{
	deaths++;
	stop_loop = 1;
	pf.className = "dead";
	stat.innerHTML = "YOU'RE DEAD! PRESS [R] TO RESTART OR [L] TO QUICK LOAD<br>";
	stat.className = "red";
	if (!tut && deaths == 6)
	{
		var tmp = ((level % 2 == 0)?level:level+1)*2-2;
		if (progress <= tmp)
		{
			progress++;
			saveCookie();
		}
	}
}

function win()
{
	stop_loop = 2;
	pf.className = "won";
	if (tut) stat.innerHTML = "<br>";
	else
	{
		stat.innerHTML = "NICELY DONE! [ENTER] FOR NEXT LEVEL OR [R] TO RESTART<br>";
		stat.className = "lightGreen";
		can_advance = true;
		var tmp = ((level % 2 == 0)?level:level+1)*2;
		if (progress <= tmp)
		{
			progress = tmp;
			saveCookie();
		}
	}
}

document.onkeydown = function(e)
{
	var q;
	if (ie) q = event.keyCode;
	else q = e.keyCode;
	if (!tut)
	{
		if (q == 37) key_left = kd_left = 1;
		if (q == 38) key_up = kd_up = 1;
		if (q == 39) key_right = kd_right = 1;
		if (q == 40) key_down = kd_down = 1;
	}
	if (q == 'R'.charCodeAt(0)) restart();
	if (q == 'S'.charCodeAt(0)) quickSave();
	if (q == 'L'.charCodeAt(0)) quickLoad();
	if (q == 'P'.charCodeAt(0)) pause();
	if (q == 'B'.charCodeAt(0))
	{
		document.getElementById("bugs").className = "here";
		bugs = true;
	}
	if (q == 'C'.charCodeAt(0)) document.getElementById("coords").className = "here";//////// Commented out for Murder Mystery
	if (q == 'W'.charCodeAt(0) && bugs) speed();
	if (q == 'E'.charCodeAt(0) && !editing)
	{
		//////// Commented out for Murder Mystery
		//pad.value = resp;
		//if (!pausebutton) pause();
		//editing = true;
		//editor.className = "here";
	}
	if (q == 'Q'.charCodeAt(0))
	{
		var tmp = progress;
		progress = 36;
		showLevels();
		progress = tmp;
		//bugs = true;/////////
	}
	if (q == 13 && can_advance)
	{
	    can_advance = false;
	    if (level < 0 || level > 25) level = 1;
	    else if (level > 16) level++;
	    else if ((level % 2) == 0) level++;
	    else level += 2;
	    getLvl(level);
	}
}

document.onkeyup = function(e)
{
	if(!tut)
	{
		var q;
		if(ie) q = event.keyCode;
		else q = e.keyCode;
		if(q == 37) if(key_left == 2)  key_left = 0;  else kd_left = 2;
		if(q == 38) if(key_up == 2)    key_up = 0;    else kd_up = 2;
		if(q == 39) if(key_right == 2) key_right = 0; else kd_right = 2;
		if(q == 40) if(key_down == 2)  key_down = 0;  else kd_down = 2;
	}
}

function pollInput()
{
	if(kd_left == 2 && key_left == 2)   kd_left = key_left = 0;
	if(kd_up == 2 && key_up == 2)       kd_up = key_up = 0;
	if(kd_right == 2 && key_right == 2) kd_right = key_right = 0;
	if(kd_down == 2 && key_down == 2)   kd_down = key_down = 0;
}