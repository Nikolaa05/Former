
const poruke = [
  "Zar stvarno nemaš pametnija posla?",

  "Danas ipak ne čitamo Informer.",

  "Former te je upravo spasao loše odluke.",

  "Pokušaj ponovo. Šalim se, nemoj.",

  "Neki linkovi jednostavno ne zaslužuju klik.",

  "Pristup odbijen. Zahvali mi kasnije.",

  "Informer? Ma daj, možeš ti bolje.",

  "Tvoj pregledač je upravo odahnuo.",

  "Čestitamo! Uspešno si izbegao Informer.",

  "Informer, više kao Former!",

  "Former radi prekovremeno zbog tebe."
];

const nasumicnaPoruka =
  poruke[Math.floor(Math.random() * poruke.length)];

document.getElementById("poruka").textContent =
  nasumicnaPoruka;
