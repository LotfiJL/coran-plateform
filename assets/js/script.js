const apiURL = "https://mp3quran.net/api/v3";
const language = "ar";

async function getReciters() {
  const reciter = document.getElementById("chooseReciter");
  const response = await fetch(`${apiURL}/reciters?language=${language}`);
  const data = await response.json();

  data.reciters.forEach((rec) => {
    reciter.innerHTML += ` <option value = ${rec.id}> ${rec.name} </option>`;
  });
  reciter.addEventListener("change", (e) => {
    getRiwayah(e.target.value);
  });
}
getReciters();

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

async function getSurah(surahServer, surahList) {
  const Suraah = document.getElementById("chooseSurah");
  const response = await fetch(`${apiURL}/suwar`);
  const data = await response.json();
  console.log(data.suwar);
  const suraNames = data.suwar; // Rename variable to suraNames
  const selectedSurahs = surahList.split(",");
  //console.log(selectedSurahs);
  selectedSurahs.forEach((suraId) => {
    suraNames.forEach((suraName) => {
      if (suraName.id == suraId) {
        console.log(suraName.name);
        Suraah.innerHTML += `<option value ${suraName.id}>${suraName.name}</option>`;
      }
    });
  });
}
