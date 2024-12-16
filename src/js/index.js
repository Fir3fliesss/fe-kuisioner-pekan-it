const loading = document.getElementById("loading");
const bukaList = document.getElementById("BukaList");
const kelas = document.getElementById("kelas");
const main = document.getElementById("main");

window.addEventListener("load", () => {
  loading.classList.remove("flex");
  loading.classList.add("hidden");
  main.classList.remove("hidden");
  main.classList.add("block");
});

bukaList.addEventListener("click", () => {
  if (kelas.classList.contains("max-h-0")) {
    kelas.classList.replace("max-h-0", "max-h-[2000px]");
  } else {
    kelas.classList.replace("max-h-[2000px]", "max-h-0");
  }
});
