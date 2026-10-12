import { useState } from "react";
import CoffeeCup from "./components/CoffeeCup";
import "./FormKopi.css";

// Aturan valid untuk setiap field
const ATURAN = {
  nama: (v) => v.trim().split(/\s+/).length >= 2,
  email: (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
  hp: (v) => /^(08|\+628)\d{8,11}$/.test(v.replace(/[\s-]/g, "")),
  password: (v) => v.length >= 8,
};

const PETUNJUK = {
  nama: "Tulis nama depan dan belakang",
  email: "Contoh: nama@email.com",
  hp: "Diawali 08 atau +628, 10–13 digit",
  password: "Minimal 8 karakter",
};

const FIELD = [
  { id: "nama", label: "Nama Lengkap", type: "text", placeholder: "Raja Sihombing", icon: "👤" },
  { id: "email", label: "Email", type: "email", placeholder: "kamu@email.com", icon: "✉️" },
  { id: "hp", label: "No. HP", type: "tel", placeholder: "0812 3456 7890", icon: "📱" },
  { id: "password", label: "Password", type: "password", placeholder: "••••••••", icon: "🔒" },
];

export default function FormKopi() {
  const [form, setForm] = useState({ nama: "", email: "", hp: "", password: "" });
  const [disentuh, setDisentuh] = useState({});
  const [lihatPw, setLihatPw] = useState(false);
  const [selesai, setSelesai] = useState(false);

  // Hitung berapa field yang valid → menentukan isi cangkir (tiap field = 1/4)
  const valid = Object.fromEntries(FIELD.map((f) => [f.id, ATURAN[f.id](form[f.id])]));
  const terisi = Object.values(valid).filter(Boolean).length;
  const penuh = terisi === FIELD.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (penuh) setSelesai(true);
  };

  const ulang = () => {
    setForm({ nama: "", email: "", hp: "", password: "" });
    setDisentuh({});
    setSelesai(false);
  };

  return (
    <div className="fk-wrap">
      <div className="fk-layout">
        {selesai ? (
          <div className="fk-card fk-hasil">
            <p className="fk-eyebrow">Pendaftaran berhasil</p>
            <h1 className="fk-title">Selamat datang, {form.nama.split(" ")[0]}! ☕</h1>
            <p className="fk-desc">
              Kopimu sudah siap. Akun dengan email <b>{form.email}</b> berhasil dibuat.
            </p>
            <button className="fk-btn" onClick={ulang}>Seduh lagi</button>
          </div>
        ) : (
          <form className="fk-card" onSubmit={handleSubmit} noValidate>
            <header>
              <p className="fk-eyebrow">Kedai Kopi Pagi</p>
              <h1 className="fk-title">Seduh Akunmu</h1>
              <p className="fk-desc">Setiap kolom yang kamu isi menambah seperempat cangkir kopi.</p>
            </header>

            {FIELD.map((f) => {
              const isPw = f.id === "password";
              const ok = valid[f.id];
              const salah = disentuh[f.id] && !ok && form[f.id] !== "";
              return (
                <label key={f.id} className="fk-field">
                  <span className="fk-label">{f.label}</span>
                  <div className={`fk-input ${ok ? "ok" : ""} ${salah ? "salah" : ""}`}>
                    <span className="fk-icon" aria-hidden="true">{f.icon}</span>
                    <input
                      type={isPw && lihatPw ? "text" : f.type}
                      placeholder={f.placeholder}
                      value={form[f.id]}
                      autoComplete={isPw ? "new-password" : "on"}
                      onChange={(e) => setForm({ ...form, [f.id]: e.target.value })}
                      onBlur={() => setDisentuh({ ...disentuh, [f.id]: true })}
                    />
                    {isPw && (
                      <button
                        type="button"
                        className="fk-lihat"
                        onClick={() => setLihatPw(!lihatPw)}
                        aria-label={lihatPw ? "Sembunyikan password" : "Tampilkan password"}
                      >
                        {lihatPw ? "🙈" : "👁️"}
                      </button>
                    )}
                    <span className={`fk-centang ${ok ? "tampil" : ""}`} aria-hidden="true">✓</span>
                  </div>
                  <small className={salah ? "fk-err" : "fk-hint"}>{PETUNJUK[f.id]}</small>
                </label>
              );
            })}

            <button type="submit" className="fk-btn" disabled={!penuh}>
              {penuh ? "Daftar sekarang" : `Lengkapi dulu (${terisi}/4)`}
            </button>
          </form>
        )}

        <aside className="fk-samping">
          <CoffeeCup terisi={selesai ? 4 : terisi} />
        </aside>
      </div>
    </div>
  );
}