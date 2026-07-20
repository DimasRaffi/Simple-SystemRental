let daftarKendaraan = [
    {
        id: 1,
        nama: "Porsche",
        jenis: "Mobil",
        tarif: 20000000,
        fitur: "Termasuk Sopir + BBM",
        status: "Tersedia",
        gambar: "img/car-2.jpg"
    },
    {
        id: 2,
        nama: "Audi",
        jenis: "Mobil",
        tarif: 12000000,
        fitur: "Lepas Kunci Only",
        status: "Dirental",
        gambar: "img/car-3.jpg"
    },
    {
        id: 3,
        nama: "Ducati",
        jenis: "Motor",
        tarif: 4500000,
        fitur: "1 Helm + BBM",
        status: "Tersedia",
        gambar: "img/motor-1.jpg"
    }
]

function renderKoleksi(){
    const wadahGrid = document.getElementById("grid-kendaraan");
    wadahGrid.innerHTML = "";

    daftarKendaraan.forEach((item) => {
        const isTersedia = item.status === "Tersedia";
        const badgeColor = isTersedia ? "bg-green-500/15 text-green-500 border-green-500/25" : "bg-red-500/15 text-red-500 border-red-500/25";

        const buttonHTML = isTersedia
            ? `<button onclick="sewaKendaraan(${item.id})" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-all">Sewa Kendaraan</button>`
            : `<button disabled class="w-full bg-gray-800 text-gray-500 text-sm font-medium py-2.5 rounded-lg cursor-not-allowed">Tidak Tersedia</button>`;
            
        wadahGrid.innerHTML += `
        <div class="bg-gray-900 border border-gray-800 rounded-xl overflow-hidden shadow-md hover:border-blue-500/50 transition-all flex flex-col">
            <div class="relative w-full h-48 bg-gray-900 flex items-center justify-center overflow-hidden">
                <img src="${item.gambar}" alt="${item.nama}" class="w-full h-full object-cover">
                <span class="absolute top-3 right-3 ${badgeColor} text-xs font-semibold px-2.5 py-1 rounded-full border ">
                   ${item.status}
                </span>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                 <div>
                    <span class="text-xs font-bold uppercase tracking-wider ${item.jenis === 'Mobil' ? 'text-blue-400' : 'text-orange-500'}">${item.jenis}</span>
                    <h4 class="text-lg font-bold text-white mt-0.5">${item.nama}</h4>
                    <p class="text-gray-400 text-sm mt-2">Tarif: <span class="font-medium text-gray-300">Rp${item.tarif.toLocaleString('id-ID')}</span>/ hari</p>
                </div>
                <div class="bg-gray-900/50 p-3 rounded-lg border border-gray-900 text-xs text-gray-500">
                    ${item.jenis === 'Mobil' ? '🚩' : '🪖'}<span class="font-medium text-gray-400">Fitur:</span> ${item.fitur}
                </div>
                ${buttonHTML}
            </div>
        </div>
        `;
    });

}
renderKoleksi();

document.querySelector("#form-tambah-unit button").addEventListener("click", function(){
    const namaInput = document.getElementById("input-nama").value;
    const jenisInput = document.getElementById("input-jenis").value;
    const tarifInput = document.getElementById("input-tarif").value;
    const fiturInput = document.getElementById("input-fitur").value;

    if (namaInput === "" || tarifInput === "" || fiturInput === ""){
        alert("⚠️ Mohon lengkapi semua data inputan terlebih dahulu, Dimas!");
        return;
    }

    const objekBaru = {
        id : daftarKendaraan.length + 1,
        nama : namaInput,
        jenis : jenisInput,
        tarif : parseInt(tarifInput),
        fitur : fiturInput,
        status : "Tersedia",
        gambar: jenisInput === "Mobil"
            ? "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80"
            : "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80"

    };

    daftarKendaraan.push(objekBaru);

    renderKoleksi();

    alert(`🎉 Sukses! ${namaInput} berhasil ditambahkan ke dalam sistem Garasi PBO.`)
})

function sewaKendaraan(idTarget){
    const kendaraanDipilih = daftarKendaraan.find((item) => item.id === idTarget);

    if (kendaraanDipilih){
        kendaraanDipilih.status = "Dirental";

        alert(`🔑 Sukses! ${kendaraanDipilih.nama} berhasil disewa.`);

        renderKoleksi();
    }
}