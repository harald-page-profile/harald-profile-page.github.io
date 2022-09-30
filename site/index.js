const beerOClockWeekDay = 5; // 0 = Sunday, 5 = Friday
const beerOClockStart = 16; // 16:00
const beerOClockEnd = 21; // 21:00

function updateCountdown() {
  let boc = timeUntilBeerOClock();
  if (!boc) {
    document.getElementById("cover").style.display="block";
    var audio = new Audio('soundclip.mp3');
    audio.play();
    return;
  }

  setDigitClass(document.getElementById("d"), boc[0]);
  setDigitClass(document.getElementById("h1"), boc[1] / 10);
  setDigitClass(document.getElementById("h2"), boc[1] % 10);
  setDigitClass(document.getElementById("m1"), boc[2] / 10);
  setDigitClass(document.getElementById("m2"), boc[2] % 10);
  setDigitClass(document.getElementById("s1"), boc[3] / 10);
  setDigitClass(document.getElementById("s2"), boc[3] % 10);

  setTimeout(updateCountdown, 1550 - new Date().getMilliseconds());
}

function timeUntilBeerOClock() {
  let now = new Date();
  let daysUntilNextBeerOClock = (beerOClockWeekDay + 7 - now.getDay()) % 7;

  if (!daysUntilNextBeerOClock && now.getHours() >= beerOClockEnd)
    daysUntilNextBeerOClock = 7;

  let beerOClock = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + daysUntilNextBeerOClock,
    beerOClockStart
  );
  let timeSpan = beerOClock - now;

  return timeSpan < 0
    ? null // Beer o'clock is now!
    : timespanToUnits(timeSpan);
}

function timespanToUnits(ts) {
  const units = [864e5, 36e5, 6e4, 1e3];
  const popUnit = u => { let r = parseInt(ts / u); ts %= u; return r; };
  return units.map(popUnit);
}

function setDigitClass(e, n) {
  n = Math.floor(n);
  if (e.className) {
    let m = parseInt(e.className.match(/d\d?(\d)/)[1]);
    if (m == n) return; // no change needed

    if (m || n == 9) e.className = "digit d" + n;
    else e.className = "digit spinto d" + n;

    if (!n) setTimeout(() => e.className = "digit d10", 750);
  } else e.className = "digit d" + (n ? n : "10");
}

setTimeout(updateCountdown, 1550 - new Date().getMilliseconds());
