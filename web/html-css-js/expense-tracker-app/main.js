/**
 * ========================================================
 * Expense Tracker App — main.js
 * ========================================================
 * Tulis seluruh kode JavaScript kamu di sini.
 */

// TODO [Basic] Buat variabel array untuk menyimpan semua data transaksi, contoh: let transactions = []
// TODO [Basic] Buat fungsi untuk menghasilkan ID unik secara otomatis, contoh: gunakan +new Date()


/**
 * ========================================================
 * Kriteria 1: Memanipulasi DOM untuk Form dan Daftar Transaksi
 * ========================================================
 */
// TODO [Basic] Ambil elemen kontainer incomeList dan expenseList dari DOM

/**
 * TODO [Basic]:
 * Buat fungsi untuk menampilkan (render) semua transaksi ke layar:
 *  - Kosongkan kontainer terlebih dahulu sebelum mengisi ulang
 *  - Gunakan perulangan, buat setiap elemen kartu dengan document.createElement()
 *  - Pastikan setiap elemen memiliki atribut data-testid yang sesuai (lihat panduan di rubrik)
 *  - Masukkan kartu ke kontainer yang tepat: income → incomeList, expense → expenseList
*/

// TODO [Basic] Tambahkan event listener 'submit' pada form, panggil e.preventDefault() di dalamnya
// TODO [Basic] Di dalam handler submit, ambil nilai input lalu tambahkan sebagai objek transaksi baru ke array

/**
 * TODO [Skilled]:
 * Tambahkan validasi input sebelum menyimpan data:
 *  - Tampilkan alert() dan hentikan proses jika judul kosong
 *  - Tampilkan alert() dan hentikan proses jika nominal kurang dari 1
 */

/**
 * TODO [Advanced]:
 * Setiap kali data transaksi berubah, perbarui Panel Dasbor:
 *  - Hitung total pemasukan, total pengeluaran, dan saldo (pemasukan - pengeluaran)
 *  - Tampilkan hasilnya ke elemen yang sesuai di HTML
 */


/**
 * ========================================================
 * Kriteria 2: Mengelola Penyimpanan Data (Web Storage API)
 * ========================================================
 */
/**
 * TODO [Basic]:
 * Data transaksi disimpan ke localStorage menggunakan JSON.stringify(), dan dimuat kembali saat halaman dibuka menggunakan JSON.parse().
 *  - Tombol "Hapus" berfungsi: transaksi yang dihapus langsung hilang dari layar dan dari localStorage.
 */

/**
 * TODO [Skilled]:
 * Tombol "Edit" berfungsi: saat ditekan, formulir (#transactionForm) secara otomatis terisi dengan data transaksi yang dipilih.
 *  - Pengguna dapat mengubah data lalu menyimpan perubahan.
 *  - Formulir kembali ke mode "Tambah" setelah pembaruan selesai.
 */

/**
 * TODO [Advanced]:
 * Gunakan Custom Event sebagai penghubung antara perubahan data dan pembaruan tampilan:
 *  - Kirim sinyal dengan document.dispatchEvent(new Event('transaction:updated')) setiap kali data berubah
 *  - Pasang satu listener untuk event tersebut yang memanggil fungsi render dan update dasbor
 */


/**
 * ========================================================
 * Kriteria 3: Fitur Interaktif (Pindah Kategori dan Pencarian)
 * ========================================================
 */
/**
 * TODO [Basic]:
 * Tambahkan tombol "Ubah Tipe" pada setiap kartu transaksi:
 *  - Saat diklik, ubah tipe transaksi: 'income' → 'expense' atau 'expense' → 'income'
 *  - Simpan perubahan ke localStorage dan perbarui tampilan
 */

/**
 * TODO [Skilled]:
 * Tambahkan event listener 'input' pada kolom pencarian:
 *  - Filter array transaksi berdasarkan kecocokan kata kunci dengan judul transaksi
 *  - Tampilkan hanya transaksi yang judulnya mengandung kata kunci tersebut
 */

/**
 * TODO [Advanced]:
 * Pastikan fitur pencarian berjalan dengan baik di semua kondisi:
 *  - Saat kolom pencarian dikosongkan, tampilkan kembali seluruh daftar transaksi
 */

const TRANSACTION_STORAGE_KEY = "EXPENSE_TRACKER_APP";
const RENDER_EVENT = "render-transaction";

const transactions = [];
let transactionEditId = null;

const incomeListField = document.getElementById("incomeList");
const expenseListField = document.getElementById("expenseList");
const transactionFormField = document.getElementById("transactionForm");
const transactionTitleInputField = document.getElementById("transactionFormTitleInput");
const transactionAmountInputField = document.getElementById("transactionFormAmountInput");
const transactionDateInputField = document.getElementById("transactionFormDateInput");
const transactionTypeInputField = document.getElementById("transactionFormTypeSelect");
const transactionFormButtonField = document.querySelector(".tracker-form__submit");
const transactionSearchField = document.getElementById("searchTransactionFormTitleInput");


function generateId() {
  return +new Date();
}

function generateTransactionObject(id, title, amount, date, type) {
  return { id, title, amount, date, type };
}

function isStorageExist() {
  if (typeof (Storage) === "undefined") {
    console.log("Browser ini tidak mendukung Web Storage");
    return false;
  }
  return true;
}

function saveData() {
  if (isStorageExist()) {
    const transactionData = JSON.stringify(transactions);
    localStorage.setItem(TRANSACTION_STORAGE_KEY, transactionData);
  }
}

function loadDataFromStorage() {
  const serializedData = localStorage.getItem(TRANSACTION_STORAGE_KEY);

  if (serializedData !== null) {
    transactions.slice(0, transactions.length);
    const data = JSON.parse(serializedData);
    for (const transaction of data) {
      transactions.push(transaction);
    }
  } else {
    console.warn("Data di web storage (local) kosong");
    return;
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
}

function findTransactionIndex(transactionId) {
  let transactionIndex = 0;
  for (const transaction of transactions) {
    if (transaction.id === transactionId) {
      return transactionIndex;
    }
    transactionIndex += 1;
  }
  console.error("Index tidak ditemukan!");
  return -1;
}

function editTransactionType(transactionId) {
  const transactionIndex = findTransactionIndex(transactionId);
  
  if (transactionIndex === -1) return;

  const transactionTarget = transactions[transactionIndex];
  if (transactionTarget.type === "income") {
    transactionTarget.type = "expense";
  } else {
    transactionTarget.type = "income";
  }

  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function editTransaction(transactionId) {
  const transactionIndex = findTransactionIndex(transactionId);

  if (transactionIndex === -1) return;

  const transactionTarget = transactions[transactionIndex];
  transactionEditId = transactionTarget.id;
  transactionTitleInputField.value = transactionTarget.title;
  transactionAmountInputField.value = transactionTarget.amount;
  transactionDateInputField.value = transactionTarget.date;
  transactionTypeInputField.value = transactionTarget.type;

  transactionFormButtonField.innerText = "Simpan Perubahan";
}

function deleteTransaction(transactionId) {
  const transactionIndex = findTransactionIndex(transactionId);

  if (transactionIndex === -1) return;

  transactions.splice(transactionIndex, 1);
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function updateDashboardPanel() {
  let balance = 0;
  let income = 0;
  let expense = 0;
  for (const transaction of transactions) {
    if (transaction.type === "income") {
      income += transaction.amount;
    } else {
      expense += transaction.amount;
    }
  }

  balance = income - expense;

  const balanceField = document.querySelector(".tracker-summary__balance-amount");
  if (balance < 0) {
    balanceField.innerText = `-Rp. ${balance.toString().replace("-", "")}`;
  } else {
    balanceField.innerText = `Rp. ${balance}`;
  }

  const incomeField = document.querySelector(".tracker-summary__stat-amount.tracker-summary__stat-amount--income");
  incomeField.innerText = `Rp. ${income}`;

  const expenseField = document.querySelector(".tracker-summary__stat-amount.tracker-summary__stat-amount--expense");
  expenseField.innerText = `Rp. ${expense}`;
}

function showTransaction() {
  incomeListField.innerHTML = "";
  expenseListField.innerHTML = "";

  for (const transaction of transactions) {
    const transactionCard = document.createElement("div");
    transactionCard.setAttribute("data-testid", "transactionItem");
    transactionCard.setAttribute("id", `transaction-${transaction.id}`)
    // transactionCard.classList.add("tracker-transaction-item"); // BIANG KEROK YG BUAT SEARCH BAR GA BEFUNGSI AJG

    const transactionTitle = document.createElement("h3");
    transactionTitle.setAttribute("data-testid", "transactionItemTitle");
    transactionTitle.innerText = transaction.title;

    const transactionAmount = document.createElement("p");
    transactionAmount.setAttribute("data-testid", "transactionItemAmount");
    transactionAmount.innerText = `Rp. ${transaction.amount}`;

    const transactionDate = document.createElement("p");
    transactionDate.setAttribute("data-testid", "transactionItemDate");
    transactionDate.innerText = transaction.date;

    const transactionType = document.createElement("p");
    transactionType.setAttribute("data-testid", "transactionItemType");

    const buttonContainer = document.createElement("div");

    const editTypeButton = document.createElement("button");
    editTypeButton.setAttribute("data-testid", "transactionItemEditTypeButton");
    editTypeButton.classList.add("tracker-transaction-item__btn");
    editTypeButton.innerText = "Ubah Tipe";
    editTypeButton.addEventListener("click", function () {
      editTransactionType(transaction.id);
    });

    const editButton = document.createElement("button");
    editButton.setAttribute("data-testid", "transactionItemEditButton");
    editButton.classList.add("tracker-transaction-item__btn");
    editButton.innerText = "Edit";
    editButton.addEventListener("click", function () {
      editTransaction(transaction.id);
    })

    const deleteButton = document.createElement("button");
    deleteButton.setAttribute("data-testid", "transactionItemDeleteButton");
    deleteButton.classList.add("tracker-transaction-item__btn", "tracker-transaction-item__btn--delete");
    deleteButton.innerText = "Hapus";
    deleteButton.addEventListener("click", function () {
      deleteTransaction(transaction.id);
    });

    buttonContainer.append(editTypeButton, editButton, deleteButton);
    transactionCard.append(transactionTitle, transactionAmount, transactionDate, transactionType, buttonContainer);

    if (transaction.type === "income") {
      incomeListField.append(transactionCard);
      transactionType.innerText = "Pendapatan";
    } else {
      expenseListField.append(transactionCard);
      transactionType.innerText = "Pengeluaran";
    }
  }

  updateDashboardPanel();
}

function resetForm() {
  transactionFormField.reset();
  transactionEditId = null;
  transactionFormButtonField.innerText = "Simpan";
}

function submitForm(e) {
  e.preventDefault();

  const transactionTitleInput = transactionTitleInputField.value.trim();
  const transactionAmountInput = parseInt(transactionAmountInputField.value);
  const transactionDateInput = transactionDateInputField.value;
  const transactionTypeInput = transactionTypeInputField.value;

  if (!transactionTitleInput) {
    alert("Keterangan transaksi tidak boleh kosong!");
    return;
  } else if (transactionAmountInput < 1 || !transactionAmountInput) {
    alert("Nilai nominal tidak boleh dibawah Rp. 1 (minimal Rp. 1)");
    return;
  }

  if (transactionEditId) {
    const transactionEditTargetIndex = findTransactionIndex(transactionEditId);
    if (transactionEditTargetIndex !== -1) {
      const transactionEditTarget = transactions[transactionEditTargetIndex];
      transactionEditTarget.title = transactionTitleInput;
      transactionEditTarget.amount = transactionAmountInput;
      transactionEditTarget.date = transactionDateInput;
      transactionEditTarget.type = transactionTypeInput;
    }
  } else {
    const transactionId = generateId();
    const transactionObj = generateTransactionObject(
      transactionId, 
      transactionTitleInput, 
      transactionAmountInput, 
      transactionDateInput, 
      transactionTypeInput
    );

    transactions.push(transactionObj);
  }

  resetForm();
  document.dispatchEvent(new Event(RENDER_EVENT));
  saveData();
}

function searchData(e) {
  const searchKey = e.target.value.toLowerCase().trim();

  for (const transaction of transactions) {
    const transactionCardField = document.getElementById(`transaction-${transaction.id}`);
    const transactionTitleTarget = transaction.title.toLowerCase();
    if (!transactionTitleTarget.includes(searchKey)) {
      transactionCardField.setAttribute("hidden", "");
    } else {
      transactionCardField.removeAttribute("hidden");
    }
  }
}

document.addEventListener("DOMContentLoaded", function () {
  transactionSearchField.addEventListener("input", searchData);
  transactionFormField.addEventListener("submit", submitForm);
  document.addEventListener(RENDER_EVENT, showTransaction);

  if (isStorageExist()) {
    loadDataFromStorage();
  }
});
