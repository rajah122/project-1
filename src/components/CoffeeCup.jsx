import "./CoffeeCup.css";

const PESAN = [
  "Cangkirmu masih kosong…",
  "Seperempat terisi ☕",
  "Setengah jalan!",
  "Sedikit lagi penuh…",
  "Kopimu siap! Selamat menikmati",
];

export default function CoffeeCup({ terisi, total = 4 }) {
  const progress = Math.round((terisi / total) * 100);
  const penuh = terisi === total;

  return (
    <div className="cc-wrap">
      {/* Uap, hanya tampil saat penuh */}
      <div className={`cc-uap ${penuh ? "tampil" : ""}`} aria-hidden="true">
        <span />
        <span />
        <span />
      </div>

      <div
        className={`cc-cangkir ${penuh ? "goyang" : ""}`}
        role="progressbar"
        aria-label="Progres pengisian formulir"
        aria-valuenow={progress}
        aria-valuemin="0"
        aria-valuemax="100"
      >
        <div className="cc-badan">
          <div className="cc-isi" style={{ height: `${progress}%` }}>
            <div className="cc-ombak" />
          </div>
          {/* garis takaran 25%, 50%, 75% */}
          <i className="cc-takar" style={{ bottom: "25%" }} />
          <i className="cc-takar" style={{ bottom: "50%" }} />
          <i className="cc-takar" style={{ bottom: "75%" }} />
        </div>
        <div className="cc-gagang" />
      </div>
      <div className="cc-piring" />

      <p className="cc-persen">{progress}%</p>
      <p className="cc-pesan">{PESAN[terisi]}</p>
    </div>
  );
}
