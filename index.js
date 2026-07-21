let isAdminMode = false;
let isDarkmode = true;
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

window.addEventListener("load", function () {
    const preloader = document.getElementById("preloader");

    if (preloader) {
        // Tahan loader selama 2000ms (2 detik) persis seperti di React tadi
        setTimeout(() => {
            // Beri efek hilang perlahan (fade-out)
            preloader.classList.add("opacity-0", "pointer-events-none");

            // Setelah animasi hilang selesai, buang elemen agar tidak menutupi tombol
            setTimeout(() => {
                preloader.style.display = "none";
            }, 500);
        }, 2000); 
    }
});

function renderKoleksi() {
    const wadahGrid = document.getElementById("grid-kendaraan");
    if (!wadahGrid) return;

    wadahGrid.innerHTML = "";

    daftarKendaraan.forEach((item) => {
        const isTersedia = item.status === "Tersedia";
        const badgeColor = isTersedia 
            ? "bg-green-500/15 text-green-600 dark:text-green-400 border-green-500/25" 
            : "bg-red-500/15 text-red-600 dark:text-red-400 border-red-500/25";

        let actionButtonHTML = "";

        if (isAdminMode) {
            // --- TAMPILAN TOMBOL UNTUK ADMIN ---
            let statusBtnHTML = "";
            
            if (!isTersedia) {
                statusBtnHTML = `
                    <button onclick="kembalikanKendaraan(${item.id})" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold py-2.5 rounded-lg transition-all cursor-pointer">
                        🔄 Selesai
                    </button>`;
            } else {
                statusBtnHTML = `
                    <button disabled class="flex-1 bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-xs font-semibold py-2.5 rounded-lg cursor-not-allowed">
                        Ready
                    </button>`;
            }

            // Gabungkan tombol Status + Tombol Hapus khusus Admin
            actionButtonHTML = `
                <div class="flex items-center gap-2">
                    ${statusBtnHTML}
                    <button onclick="hapusKendaraan(${item.id})" class="bg-red-600/10 hover:bg-red-600 border border-red-500/30 hover:border-red-600 text-red-500 hover:text-white text-xs font-semibold px-3 py-2.5 rounded-lg transition-all cursor-pointer" title="Hapus Unit">
                        🗑️ Hapus
                    </button>
                </div>
            `;
        } else {
            // --- TAMPILAN TOMBOL UNTUK USER ---
            actionButtonHTML = isTersedia
                ? `<button onclick="sewaKendaraan(${item.id})" class="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition-all cursor-pointer">Sewa Kendaraan</button>`
                : `<button disabled class="w-full bg-gray-200 dark:bg-gray-800 text-gray-400 dark:text-gray-500 text-sm font-medium py-2.5 rounded-lg cursor-not-allowed">Tidak Tersedia</button>`;
        }

        wadahGrid.innerHTML += `
        <div class="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-blue-500/50 transition-all flex flex-col">
            <div class="relative w-full h-48 bg-gray-100 dark:bg-gray-900 flex items-center justify-center overflow-hidden">
                <img src="${item.gambar}" alt="${item.nama}" class="w-full h-full object-cover">
                <span class="absolute top-3 right-3 ${badgeColor} text-xs font-semibold px-2.5 py-1 rounded-full border">
                   ${item.status}
                </span>
            </div>
            <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
                 <div>
                    <span class="text-xs font-bold uppercase tracking-wider ${item.jenis === 'Mobil' ? 'text-blue-600 dark:text-blue-400' : 'text-purple-600 dark:text-purple-400'}">${item.jenis}</span>
                    <h4 class="text-lg font-bold text-gray-900 dark:text-white mt-0.5">${item.nama}</h4>
                    <p class="text-gray-500 dark:text-gray-400 text-sm mt-2">Tarif: <span class="font-semibold text-gray-800 dark:text-gray-200">Rp${item.tarif.toLocaleString('id-ID')}</span> / hari</p>
                </div>
                <div class="bg-gray-50 dark:bg-gray-900/50 p-3 rounded-lg border border-gray-200 dark:border-gray-800 text-xs text-gray-600 dark:text-gray-400">
                    ${item.jenis === 'Mobil' ? '🚩' : '🪖'} <span class="font-medium text-gray-700 dark:text-gray-300">Fitur:</span> ${item.fitur}
                </div>
                ${actionButtonHTML}
            </div>
        </div>
        `;
    });
}   
renderKoleksi();

function kembalikanKendaraan(idTarget){
    const kendaraanDipilih = daftarKendaraan.find((item) => item.id === idTarget);

    if(kendaraanDipilih){
        kendaraanDipilih.status = "Tersedia";
        alert(`✅ Status Updated: ${kendaraanDipilih.nama} sudah kembali dan siap disewa lagi!`);
        renderKoleksi();
    }
}

const btnTambah = document.querySelector("#form-tambah-unit button");

if (btnTambah) {
    btnTambah.addEventListener("click", function () {
        const namaInput = document.getElementById("input-nama")?.value || "";
        const jenisInput = document.getElementById("input-jenis")?.value || "Mobil";
        const tarifInput = document.getElementById("input-tarif")?.value || "";
        const fiturInput = document.getElementById("input-fitur")?.value || "";
        
        // Tangkap elemen input file (Pastikan di HTML elemennya ber-id="input-gambar")
        const fileInput = document.getElementById("input-gambar");

        if (namaInput === "" || tarifInput === "" || fiturInput === "") {
            alert("⚠️ Mohon lengkapi semua data inputan terlebih dahulu!");
            return;
        }

        // Fungsi pembantu untuk mendorong data baru ke array
        const simpanDanRender = (pathGambar) => {
            const objekBaru = {
                id: daftarKendaraan.length + 1,
                nama: namaInput,
                jenis: jenisInput,
                tarif: parseInt(tarifInput),
                fitur: fiturInput,
                status: "Tersedia",
                gambar: pathGambar
            };

            daftarKendaraan.push(objekBaru);
            renderKoleksi();

            // Reset form
            document.getElementById("input-nama").value = "";
            document.getElementById("input-tarif").value = "";
            document.getElementById("input-fitur").value = "";
            if (fileInput) fileInput.value = "";

            alert(`🎉 Sukses! ${namaInput} berhasil ditambahkan ke dalam sistem.`);
        };

        // CEK APAKAH ADA FILE YANG DIUNGGAH DARI LAPTOP
        if (fileInput && fileInput.files && fileInput.files[0]) {
            const reader = new FileReader();

            // Membaca file gambar dan mengubahnya menjadi URL temporary (DataURL)
            reader.onload = function (e) {
                simpanDanRender(e.target.result);
            };

            reader.readAsDataURL(fileInput.files[0]);
        } else {
            // Jika tidak ada file yang dipilih, pakai fallback gambar default
            const fallbackGambar = jenisInput === "Mobil"
                ? "https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=400&q=80"
                : "https://images.unsplash.com/photo-1558981806-ec527fa84c39?auto=format&fit=crop&w=400&q=80";

            simpanDanRender(fallbackGambar);
        }
    });
}

function hapusKendaraan(idTarget) {
    const kendaraanDipilih = daftarKendaraan.find((item) => item.id === idTarget);

    if (!kendaraanDipilih) return;

    const konfirmasi = confirm(`⚠️ Apakah Anda yakin ingin menghapus unit "${kendaraanDipilih.nama}" dari sistem?`);

    if (konfirmasi) {
        daftarKendaraan = daftarKendaraan.filter((item) => item.id !== idTarget);
        
        alert(`🗑️ Unit ${kendaraanDipilih.nama} berhasil dihapus.`);
        
        // Render ulang grid garasi
        renderKoleksi();
    }
}

function sewaKendaraan(idTarget){
    const kendaraanDipilih = daftarKendaraan.find((item) => item.id === idTarget);

    if (kendaraanDipilih){
        kendaraanDipilih.status = "Dirental";

        alert(`🔑 Sukses! ${kendaraanDipilih.nama} berhasil disewa.`);

        renderKoleksi();
    }
}

function switchMode(){
    isAdminMode = !isAdminMode;

    const textMode = document.getElementById("text-mode");
    const indikatorMode = document.getElementById("indikator-mode");
    const sectionForm = document.getElementById("form-tambah-unit");
    const tambahButton = document.getElementById("tambah-unit")

    if(isAdminMode){
        textMode.innerText = "Admin";
        textMode.className = "text-orange-300 font-semibold";

        indikatorMode.className = "w-2.5 h-2.5 bg-orange-400 rounded-full animate-pulse";

        sectionForm.classList.remove("hidden");
        tambahButton.classList.remove("hidden");

        alert("🔒 Mode Admin Aktif: Anda sekarang memiliki hak akses untuk menambah unit baru.")

    }else{
        textMode.innerText = "User";
        textMode.className = "text-blue-300 font-semibold";

        indikatorMode.className = "w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse";

        sectionForm.classList.add("hidden");
        tambahButton.classList.add("hidden");

        alert("👤 Kembali ke Mode User: Tampilan dikhususkan untuk pelanggan.")
    }

    renderKoleksi();
}

function switchTheme() {
    isDarkmode = !isDarkmode;

    const bodyElemen = document.body;
    const iconTheme = document.getElementById("icon-theme");
    const textTheme = document.getElementById("text-theme");

    if (isDarkmode){
        bodyElemen.classList.remove("bg-gray-100", "text-gray-900");
        bodyElemen.classList.add("bg-gray-900", "text-gray-100");

        if (iconTheme) iconTheme.innerText = "🌙";
        if (textTheme) textTheme.innerText = "Dark";

        alert("🌙 Switched to Dark Mode");
    } else {
        // --- MASUK KE LIGHT MODE ---
        bodyElemen.classList.remove("bg-gray-900", "text-gray-100");
        bodyElemen.classList.add("bg-gray-100", "text-gray-900");

        if (iconTheme) iconTheme.innerText = "☀️";
        if (textTheme) textTheme.innerText = "Light";

        alert("☀️ Switched to Light Mode");
    }
}