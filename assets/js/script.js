const apiURL = "https://mp3quran.net/api/v3";
const language = "ar";

async function getReciters() {
  const reciter = document.getElementById("chooseReciter");
  const response = await fetch(`${apiURL}/reciters?language=${language}`);
  const data = await response.json();
  reciter.innerHTML = ` <option value =""> اختر </option>`;

  data.reciters.forEach((rec) => {
    reciter.innerHTML += ` <option value = ${rec.id}> ${rec.name} </option>`;
  });
  reciter.addEventListener("change", (e) => {
    getRiwayah(e.target.value);
  });
}
getReciters();

//---------------------------------------

async function getRiwayah(riwaya) {
  //console.log("riwaya:", riwaya);
  const Riwayah = document.querySelector("#chooseRiwayah");
  const response = await fetch(
    `${apiURL}/reciters?language=${language}&reciter=${riwaya}`
  );
  const data = await response.json();
  //console.log(data.reciters[0].moshaf);
  const Moshafs = data.reciters[0].moshaf;
  //console.log(Moshafs);
  Riwayah.innerHTML += ` <option
    
  value = ""
  data-server = ""
  data-surah = ""
  > اختر </option>`;

  Moshafs.forEach((riway) => {
    //console.log(riway);

    Riwayah.innerHTML += ` <option
    
    value = ${riway.id}
    data-server = "${riway.server}"
    data-surah = "${riway.surah_list}"
    > ${riway.name} </option>`;
  });

  Riwayah.addEventListener("change", (e) => {
    const selectedRiwaya = Riwayah.options[Riwayah.selectedIndex];

    const surahServer = selectedRiwaya.dataset.server;
    const surahList = selectedRiwaya.dataset.surah;
    getSurah(surahServer, surahList);
  });
}

//---------------------------------------------------------------

async function getSurah(surahServer, surahList) {
  console.log("aaa", surahServer);
  const Suraah = document.getElementById("chooseSurah");
  const response = await fetch(`${apiURL}/suwar`);
  const data = await response.json();
  //console.log(data.suwar);
  const suraNames = data.suwar; // Rename variable to suraNames
  const selectedSurahs = surahList.split(",");
  Suraah.innerHTML = `<option value "">اختر</option>`;

  //console.log(selectedSurahs);
  selectedSurahs.forEach((suraId) => {
    const padSurah = suraId.padStart(3, "0");
    suraNames.forEach((suraName) => {
      if (suraName.id == suraId) {
        // console.log(suraName.name);
        Suraah.innerHTML += `<option value="${surahServer}${padSurah}.mp3">${suraName.name}</option>`;
      }
    });
  });

  Suraah.addEventListener("change", (e) => {
    const selectedSuraa = Suraah.options[Suraah.selectedIndex];
    PlyerSuraa(selectedSuraa.value);
  });
}

function PlyerSuraa(surahMp3) {
  const audioPlayer = document.querySelector("#audioP");
  audioPlayer.src = surahMp3;
  audioPlayer.play();
}

function playLive(channel) {
  if (Hls.isSupported()) {
    var video = document.getElementById("Lvideo");
    var hls = new Hls();
    hls.loadSource(`${channel}`);
    hls.attachMedia(video);
    hls.on(Hls.Events.MANIFEST_PARSED, function () {
      video.play();
    });
  }
}
