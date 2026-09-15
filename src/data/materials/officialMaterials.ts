import { Material } from '../../types';

export const OFFICIAL_MATERIALS: Material[] = [
  {
    id: 'mat-1',
    title: 'Siklus Kardiak & Regulasi Tekanan Darah Mamalia',
    description:
      'Analisis fase sistolik dan diastolik, dinamika tekanan intraventrikuler, kurva Wiggers, serta refleks baroreseptor dalam mempertahankan perfusi organ vital.',
    type: 'Module Handbook',
    courseId: 'course-fisiologi-vet-2',
    topicId: 'top-1',
    semesterId: 'sem-3',
    readTimeMinutes: 14,
    readingTimeMinutes: 14,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['Kardiologi', 'Fisiologi Veteriner', 'Hemodinamika', 'Siklus Kardiak'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'Official Module Handbook',
    sourceDate: '2024',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-1-1',
        title: '1. Anatomi Fungsional Pompa Jantung & Fase Siklus Kardiak',
        readingTimeMinutes: 4,
        keyPoints: [
          'Jantung mamalia bekerja sebagai dua pompa sinkron seri: sirkulasi pulmonal bertekanan rendah dan sirkulasi sistemik bertekanan tinggi.',
          'Siklus kardiak dibagi menjadi sistol ventrikel (kontraksi isovolumetrik dan ejeksi) serta diastol ventrikel (relaksasi isovolumetrik dan pengisian pasif/aktif).'
        ],
        clinicalPearl:
          'Pada auskultasi mamalia, bunyi jantung pertama (S1 - "lub") menandai penutupan katup atrioventrikularis (mitral dan trikuspidalis) di awal sistol ventrikel. Bunyi kedua (S2 - "dub") menandai penutupan katup semilunaris (aorta dan pulmonalis) di awal diastol.',
        content: `Jantung mamalia bertindak sebagai dua pompa terkoordinasi yang beroperasi secara sekuensial. Ventrikel kanan mengalirkan darah deoksigenasi menuju sirkulasi pulmonal bertekanan rendah, sementara ventrikel kiri memompa darah beroksigen menuju sirkulasi sistemik dengan resistensi vaskular yang tinggi.

Secara kronologis, satu siklus kardiak utuh mencakup peristiwa elektrik dan mekanik berikut:
1. Sistol Atrium: Kontraksi atrium menyumbang 15-20% pengisian ventrikel akhir (atrial kick), terutama krusial pada laju denyut jantung tinggi.
2. Kontraksi Isovolumetrik: Miokardium ventrikel mulai berkontraksi. Tekanan intraventrikel melonjak melampaui tekanan atrium, menutup katup AV (menghasilkan S1). Volume darah intraventrikel tetap konstan (End Diastolic Volume / EDV).
3. Ejeksi Cepat & Lambat: Ketika tekanan ventrikel kiri melampaui tekanan diastolik aorta (~80 mmHg pada anjing), katup aorta membuka dan darah dipompa secara akseleratif ke dalam aorta.
4. Relaksasi Isovolumetrik: Miokardium ventrikel berelaksasi. Tekanan intraventrikel turun drastis di bawah tekanan arteri elastis, menyebabkan aliran balik sesaat yang menutup katup semilunaris (menghasilkan S2).
5. Pengisian Ventrikel Cepat & Diastasis: Begitu tekanan ventrikel turun di bawah tekanan atrium, katup AV membuka kembali dan pengisian ventrikel terjadi secara pasif.`
      },
      {
        id: 'sec-1-2',
        title: '2. Hubungan Frank-Starling & Kontraktilitas Miokardium',
        readingTimeMinutes: 5,
        keyPoints: [
          'Hukum Frank-Starling: Peningkatan venous return memperpanjang sarkomer miokardium menuju panjang optimal (Lmax), meningkatkan sensitivitas troponin C terhadap ion Ca2+ dan menghasilkan gaya kontraksi lebih kuat.',
          'Afterload merupakan beban tegangan dinding ventrikel kiri yang harus dilawan untuk membuka katup aorta.'
        ],
        clinicalPearl:
          'Pada kasus kardiomiopati dilatasi (DCM) pada anjing ras besar (Doberman Pinscher), peregangan sarkomer telah melampaui Lmax, sehingga kompensasi Frank-Starling gagal dan fraksi ejeksi menurun drastis di bawah 40%.',
        content: `Hukum Jantung Frank-Starling menyatakan bahwa energi kontraksi miokardium berbanding lurus dengan panjang awal serat otot saat akhir diastol (preload). Ketika venous return meningkat, ventrikel teregang lebih optimal menuju panjang sarkomer ~2.2 µm, yang memaksimalkan pembentukan jembatan silang aktin-miosin.

Faktor Penentu Stroke Volume (Volume Sekuncup):
- Preload: Didefinisikan secara klinis oleh End Diastolic Volume (EDV) atau End Diastolic Pressure (EDP).
- Kontraktilitas (Inotropisme): Kemampuan intrinsik miokardium menghasilkan gaya pada panjang serat tertentu, dimediasi oleh ketersediaan kalsium sitosolik bebas.
- Afterload: Ditentukan oleh resistensi vaskular sistemik (Systemic Vascular Resistance / SVR) dan diameter ventrikel sesuai hukum Laplace (Tegangan = [Tekanan × Jari-jari] / [2 × Tebal Dinding]).`
      },
      {
        id: 'sec-1-3',
        title: '3. Regulasi Tekanan Darah Sistemik & Refleks Baroreseptor',
        readingTimeMinutes: 5,
        keyPoints: [
          'Mean Arterial Pressure (MAP) = Cardiac Output (CO) × Total Peripheral Resistance (TPR).',
          'Baroreseptor arteri di sinus karotikus dan arkus aorta merespons distensi regangan dinding arteri secara langsung.',
          'Aksis Renin-Angiotensin-Aldosteron (RAAS) berfungsi sebagai regulasi tekanan darah jangka menengah dan panjang.'
        ],
        clinicalPearl:
          'Penurunan perfusi renal yang terdeteksi oleh aparatus jukstaglomerulus memicu sekresi enzim renin, mengkatalisis konversi angiotensinogen menjadi Angiotensin I, yang kemudian diubah oleh ACE menjadi Angiotensin II (vasokonstriktor poten dan pemicu sekresi aldosteron).',
        content: `Tekanan arteri rata-rata (Mean Arterial Pressure / MAP) merupakan parameter utama perfusi organ pada pasien bedah maupun kritis veteriner. Nilai target MAP minimal adalah 60 mmHg untuk menjamin perfusi kapiler ginjal dan serebral.

Mekanisme Kontrol Cepat: Refleks Baroreseptor
1. Reseptor mekanosensitif di sinus karotikus (dinervasi oleh N. Glossopharyngeus / CN IX) dan arkus aorta (dinervasi oleh N. Vagus / CN X) mendeteksi perubahan tegangan pulsatil dinding arteri.
2. Ketika MAP turun (misal saat perdarahan atau vasodilatasi anestesi): frekuensi cetusan potensial aksi baroreseptor ke nukleus traktus solitarius (NTS) di medula oblongata menurun.
3. Penurunan inhibisi NTS melepaskan aktivitas simpatis eferen dari medula ventrolateral:
   - Reseptor Beta-1 adrenergik miokardium memediasi takikardia kronotropik positif dan inotropik positif.
   - Reseptor Alfa-1 adrenergik otot polos arteriolar memediasi vasokonstriksi sistemik, meningkatkan TPR dan mengembalikan MAP ke nilai setpoint fisiologis.`
      }
    ]
  },
  {
    id: 'mat-2',
    title: 'Elektrofisiologi Sel Pacemaker & Konduksi Jantung',
    description:
      'Kinetika saluran ionik If (funny current), potensial aksi fase 0-4 pada sel nodus sinoatrialis (SA Node), berkas His-Purkinje, serta dasar interpretasi elektrokardiogram (EKG) veteriner.',
    type: 'Module Handbook',
    courseId: 'course-fisiologi-vet-2',
    topicId: 'top-1',
    semesterId: 'sem-3',
    readTimeMinutes: 12,
    readingTimeMinutes: 12,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['Elektrofisiologi', 'EKG', 'SA Node', 'Aritmia'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'Official Module Handbook',
    sourceDate: '2024',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-2-1',
        title: '1. Otoritmisitas Nodus Sinoatrialis & Saluran Funny (If)',
        readingTimeMinutes: 6,
        keyPoints: [
          'Sel nodus SA tidak memiliki potensial membran istirahat sejati; membran sel secara spontan terdepolarisasi selama fase 4.',
          'Saluran hiperpolarisasi-teraktivasi (HCN / If) mengalirkan influks ion Na+ yang memicu depolarisasi lambat.'
        ],
        clinicalPearl:
          'Obat sedativa agonis Alfa-2 adrenergik (seperti Xylazine atau Dexmedetomidine) menstimulasi tonus vagal sentral secara kuat, menyebabkan bradikardia sinus berat dan AV block derajat 1 atau 2 pada kuda dan anjing.',
        content: `Kemampuan jantung berdenyut secara otomatis berakar dari sifat elektrofisiologis unik sel pemacu (pacemaker) di Nodus Sinoatrialis (SA Node), yang berlokasi di tautan vena kava kranialis dan atrium kanan.

Potensial Aksi Respons Lambat (SA Node & AV Node):
- Fase 4 (Pre-potensial / Pacemaker Potential): Membran sel secara bertahap mengalami depolarisasi spontan dari -60 mV menuju ambang letup (threshold) -40 mV. Fenomena ini dipicu oleh saluran HCN (Hyperpolarization-activated Cyclic Nucleotide-gated) yang membuka saat membran terpolarisasi (funny current / If).
- Fase 0 (Depolarisasi Cepat): Dipicu oleh pembukaan saluran kalsium tipe T (transient) diikuti oleh saluran kalsium tipe L (long-lasting). Depolarisasi pada sel pacemaker tidak bergantung pada arus natrium cepat.
- Fase 3 (Repolarisasi): Terjadi akibat penutupan saluran Ca2+ dan pembukaan saluran kalium efluks tertunda (delayed rectifier K+ channels), membawa potensial membran kembali ke -60 mV.`
      },
      {
        id: 'sec-2-2',
        title: '2. Sistem Konduksi Cepat & Korelasi Gelombang EKG',
        readingTimeMinutes: 6,
        keyPoints: [
          'Gelombang P merefleksikan depolarisasi kedua atrium.',
          'Interval PR merefleksikan perlambatan fisiologis konduksi impuls di AV node.',
          'Kompleks QRS merefleksikan depolarisasi ventrikel yang cepat melalui serabut Purkinje.'
        ],
        clinicalPearl:
          'Pada kuda atletik normal, blok atrioventrikular derajat 2 (Mobitz tipe 1 / Wenckebach) sering ditemukan saat istirahat akibat tonus parasimpatis tinggi, dan akan menghilang secara fisiologis begitu hewan berolahraga.',
        content: `Impuls elektrik dari nodus SA disalurkan melalui berkas internodal menuju Nodus Atrioventrikularis (AV Node). Di AV node, kecepatan konduksi diperlambat hingga ~0.05 m/s untuk memberi waktu yang cukup bagi atrium berkontraksi mengisi ventrikel secara tuntas sebelum ventrikel dieksitasi.

Korelasi Sadapan EKG Standar:
- Gelombang P: Depolarisasi atrium (vektor dominan kaudoventral).
- Interval PR: Waktu transit dari nodus SA melintasi AV node dan berkas His.
- Kompleks QRS: Depolarisasi miokardium ventrikel. Durasi normal pada anjing: < 0.06 detik; kucing: < 0.04 detik.
- Segmen ST & Gelombang T: Repolarisasi miokardium ventrikel.`
      }
    ]
  },
  {
    id: 'mat-3',
    title: 'Mikroarsitektur & Dinamika Fermentasi Retikulorumen',
    description:
      'Ekologi mikroba anaerobik rumen (bakteri selulolitik vs amilolitik, protozoa siliata, fungi rumen), motilitas siklus primer-sekunder, serta fisiologi ruminasi dan eruktasi pada sapi.',
    type: 'Module Handbook',
    courseId: 'course-fisiologi-vet-2',
    topicId: 'top-2',
    semesterId: 'sem-3',
    readTimeMinutes: 16,
    readingTimeMinutes: 16,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['Ruminansia', 'Fisiologi Digesti', 'Mikrobiom Rumen', 'Eruktasi'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'Official Module Handbook',
    sourceDate: '2024',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-3-1',
        title: '1. Kompartemen Lambung Poligastrik & Stratifikasi Rumen',
        readingTimeMinutes: 5,
        keyPoints: [
          'Rumen, retikulum, dan omasum merupakan proventrikulus aglandular yang dilapisi epitel skuamosa bertingkat berkornifikasi.',
          'Stratifikasi ingesta rumen terdiri atas: kantong gas dorsal, matras serat terapung (forage mat), zona suspensi cair, dan zona partikel padat densitas tinggi di ventral.'
        ],
        clinicalPearl:
          'Benda asing logam tajam (paku/kawat) cenderung mengendap di dasar retikulum yang berbentuk sarang lebah (honeycomb), memicu retikuloperitonitis traumatika (Hardware Disease) jika menembus diafragma menuju perikardium.',
        content: `Lambung hewan ruminansia terdiri atas empat kompartemen fungsional: rumen, retikulum, omasum, dan abomasum (lambung sejati berkelenjar). Retikulum dan rumen bekerja sebagai satu unit fisiologis terpadu yang disebut retikulorumen.

Karakteristik Lingkungan Retikulorumen:
- Volume: 100-200 liter pada sapi perah dewasa.
- Suhu konstan: 38.5 - 40°C.
- Kondisi anaerobik ketat dengan potensial redoks Eh -250 hingga -350 mV.
- pH fisiologis stabil: 6.2 - 6.8 dipertahankan oleh bikarbonat dan fosfat saliva (100-150 liter saliva diproduksi per hari saat mastikasi dan ruminasi).`
      },
      {
        id: 'sec-3-2',
        title: '2. Siklus Kontraksi Motilitas & Fisiologi Eruktasi',
        readingTimeMinutes: 6,
        keyPoints: [
          'Siklus Kontraksi Primer (Mixing Cycle): Mencampur ingesta dan memfasilitasi kontak mikroba dengan substrat serat.',
          'Siklus Kontraksi Sekunder (Eructation Cycle): Mendorong akumulasi gas fermentasi (CO2 dan CH4) ke arah kardia untuk dikeluarkan melalui eruktasi.'
        ],
        clinicalPearl:
          'Kegagalan eruktasi akibat pembentukan busa persisten (frothy bloat) oleh protein leguminosa atau pelepasan lendir mukosa menyebabkan kembung rumen akut yang mengancam nyawa dengan menekan vena kava kaudalis dan diafragma.',
        content: `Motilitas retikulorumen diatur oleh serabut parasimpatis N. Vagus melalui refleks vagovagal di medula oblongata. Terdapat dua pola kontraksi motorik independen:

1. Siklus Primer (Siklus Pencampuran):
Diawali dengan kontraksi bifasik retikulum. Kontraksi pertama mengalirkan ingesta kasar ke arah dorsal sac rumen; kontraksi kedua yang lebih kuat mendorong ingesta halus yang telah terfermentasi menuju saluran retikulo-omasal.

2. Siklus Sekunder (Siklus Eruktasi):
Terjadi rata-rata satu kali setiap dua siklus primer. Kontraksi dimulai dari kantung ventral kranial rumen dan menyapu kantung dorsal ke arah kranial, mendorong gas (65% CO2 dan 35% CH4) menuju kardia yang terbuka, lalu disalurkan ke faring dan sebagian besar diinhalasi ke saluran pernapasan sebelum dihembuskan keluar.`
      }
    ]
  },
  {
    id: 'mat-4',
    title: 'Sintesis, Penyerapan, & Metabolisme VFA pada Ruminansia',
    description:
      'Biokimia produksi asam asetat, propionat, dan butirat oleh bakteri selulolitik vs amilolitik, mekanisme transpor epitel papila rumen, serta kontribusinya terhadap glukoneogenesis dan sintesis lemak susu.',
    type: 'RPKPS',
    courseId: 'course-fisiologi-vet-2',
    topicId: 'top-2',
    semesterId: 'sem-3',
    readTimeMinutes: 14,
    readingTimeMinutes: 14,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['VFA', 'Biokimia Veteriner', 'Glukoneogenesis', 'Susu'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'RPKPS',
    sourceDate: '2024',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-4-1',
        title: '1. Fermentasi Karbohidrat & Rasio Asetat:Propionat',
        readingTimeMinutes: 7,
        keyPoints: [
          'Bakteri selulolitik (Fibrobacter succinogenes, Ruminococcus albus) mendegradasi selulosa menghasilkan asam asetat dominan (rasio asetat:propionat > 3:1).',
          'Pemberian pakan konsentrat tinggi pati menstimulasi bakteri amilolitik (Streptococcus bovis), meningkatkan propionat dan menurunkan pH rumen.'
        ],
        clinicalPearl:
          'Penurunan pH rumen drastis < 5.2 memicu asidosis laktat akut (grain overload) karena Streptococcus bovis beralih memproduksi asam laktat D(-), yang tidak dapat dimetabolisme cepat oleh hati sapi.',
        content: `Asam Lemak Terbang (Volatile Fatty Acids / VFA) merupakan sumber energi metabolik utama bagi ruminansia, menyuplai 70-80% total kebutuhan energi harian tubuh. Tiga VFA utama adalah Asetat (CH3COO-), Propionat (CH3CH2COO-), dan Butirat (CH3CH2CH2COO-).

Jalur Fermentasi:
- Diet Hijauan Tinggi Serat Kasar: Didominasi oleh asetat (rasio asetat:propionat ~ 70:20). Asetat diserap langsung ke sirkulasi sistemik dan menjadi substrat utama pembentukan de novo lemak susu (milk fat) di kelenjar ambing.
- Diet Konsentrat / Biji-bijian: Menghasilkan propionat dalam porsi jauh lebih tinggi (rasio asetat:propionat ~ 50:40). Propionat adalah satu-satunya VFA yang bersifat glukogenik.`
      },
      {
        id: 'sec-4-2',
        title: '2. Absorpsi Epitel Rumen & Peran Propionat dalam Glukoneogenesis',
        readingTimeMinutes: 7,
        keyPoints: [
          'Papila rumen meningkatkan luas permukaan absorptif VFA hingga puluhan kali lipat.',
          'Propionat diserap melalui vena porta ke dalam hepatosit dan dikonversi menjadi oksaloasetat via suksinil-KoA untuk jalur glukoneogenesis.'
        ],
        clinicalPearl:
          'Pada sapi perah masa transisi awal laktasi, defisit suplai propionat memicu mobilisasi asam lemak non-esterifikasi (NEFA) masif dari jaringan adiposa, menyebabkan akumulasi badan keton dan penyakit ketosis klinis.',
        content: `Mekanisme Penyerapan VFA:
VFA diserap melintasi epitel skuamosa berlapis bertingkat melalui dua mekanisme:
1. Difusi pasif non-ionik: VFA bentuk terprotonasi (lipofilik) menembus membran lipid dwilapis secara bebas.
2. Penukar anion VFA-/HCO3-: VFA bermuatan diserap bersamaan dengan sekresi ion bikarbonat ke lumen, yang berfungsi ganda menetralkan keasaman rumen.

Nasib Metabolik:
- Butirat: 90% dimetabolisme di dinding epitel rumen menjadi beta-hidroksibutirat (BHBA), sumber energi untuk otot skelet dan jantung.
- Propionat: Diangkut via vena porta hepatica menuju hepar. Di hati, propionat mengalami karboksilasi menjadi metilmalonil-KoA dan suksinil-KoA, masuk ke siklus TCA untuk mensintesis glukosa darah melalui glukoneogenesis.`
      }
    ]
  },
  {
    id: 'mat-ppdh-1',
    title: 'Panduan Prosedur Laparotomi Eksplorasi & Enterotomi Koasistensi PPDH',
    description:
      'Protokol resmi persiapan bedah, teknik insisi linea alba, palpasi traktus intestinal, teknik enterotomi anti-mesenterika, dan uji patensi kebocoran usus di Instalasi Bedah RSH Prof. Soeparwi FKH UGM.',
    type: 'Clinical Reference',
    courseId: 'course-ppdh-bedah-radiologi',
    topicId: 'top-ppdh-bedah',
    semesterId: 'sem-ppdh',
    readTimeMinutes: 15,
    readingTimeMinutes: 15,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['PPDH', 'Bedah Lapangan', 'Enterotomi', 'RSH Soeparwi'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'Clinical Reference',
    sourceDate: '2024/2025',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-p-1',
        title: '1. Persiapan Pasien & Pendekatan Linea Alba',
        readingTimeMinutes: 7,
        keyPoints: [
          'Pasien diposisikan dorsal recumbency dan dipasang drape steril 4 sudut.',
          'Insisi linea alba pada umbilikus meminimalkan perdarahan karena bersifat avaskular.'
        ],
        clinicalPearl:
          'Selalu hitung jumlah kasa laparotomi sebelum membuka peritoneum dan sebelum menutup dinding abdomen untuk mencegah gossipiboma (tertinggalnya kasa bedah di rongga abdomen).',
        content: `Protokol Laparotomi Eksplorasi RSH Prof. Soeparwi:
1. Pra-bedah: Pasien anjing/kucing dipuasakan 8-12 jam dari pakan (air minum tetap diberikan hingga 2 jam sebelum premedikasi). Pasang IV catheter 20-22G pada vena cephalica.
2. Scrubbing & Antiseptik: Cukur bulu dari prosesus xiphoideus hingga os pubis. Cuci kulit dengan sabun antiseptik klorheksidin glukonat 4% dilanjutkan alkohol 70% dan povidone iodine 10%.
3. Insisi: Gunakan scalpel blade no. 10 atau 15. Insisi kulit tepat di garis median. Diseksi tumpul jaringan subkutan hingga linea alba terlihat berwarna putih keperakan. Angkat linea alba dengan pinset bergigi (rat-tooth), buat lubang tusuk (stab incision) mengarah ke kranial untuk menghindari perforasi organ dalam.`
      },
      {
        id: 'sec-p-2',
        title: '2. Teknik Enterotomi & Penutupan Jahitan Usus',
        readingTimeMinutes: 8,
        keyPoints: [
          'Insisi enterotomi selalu dilakukan pada batas anti-mesenterika di sebelah aboral (distal) dari korpus alienum (benda asing) yang menyumbat.',
          'Gunakan benang monofilamen sintesis absorbable USP 3-0 atau 4-0 (Polydioxanone / PDS atau Monocryl) dengan jarum taper point round bodied.'
        ],
        clinicalPearl:
          'Lakukan uji kebocoran usus (leak test) dengan mengoklusi segmen usus sepanjang 10 cm menggunakan jari asisten, menyuntikkan 10-15 ml saline steril dengan spuit 25G, dan mengamati tidak adanya rembesan air pada garis jahitan.',
        content: `Langkah Prosedur Enterotomi:
1. Isolasi Usus: Keluarkan segmen usus yang tersumbat dari rongga abdomen dan lapisi dengan kasa lembab bersuhu hangat (warm moist laparotomy pads). Cegah tumpahan isi lumen ke kavum abdomen.
2. Insisi Anti-Mesenterika: Pilih area usus di sebelah aboral dari obstruksi yang jaringannya masih sehat (berwarna merah muda dan teraba elastis). Buat insisi longitudinal pada permukaan anti-mesenterika.
3. Evakuasi Benda Asing: Keluarkan benda asing dengan bantuan forsep secara lembut tanpa merobek dinding usus.
4. Penutupan Jahitan: Jahit enterotomi dengan pola jahitan sederhana terputus (simple interrupted) atau modifikasi continuous appositional, memastikan mukosa usus terdorong ke dalam (inversion minimal) tanpa stenosis lumen.
5. Omental Wrapping: Tutup garis jahitan dengan lembaran omentum majus (omental patch) untuk mempercepat revaskularisasi dan mencegah kebocoran pasca-bedah.`
      }
    ]
  },
  {
    id: 'mat-ppdh-2',
    title: 'Protokol Terapi Cairan & Penanganan Gawat Darurat Hewan Kecil',
    description:
      'Perhitungan kebutuhan defisit cairan, rumatan harian, ongoing losses, dan laju transfusi darah pada kondisi syok hipovolemik di IGD Rumah Sakit Hewan Prof. Soeparwi FKH UGM.',
    type: 'Clinical Reference',
    courseId: 'course-ppdh-interna-hewan-kecil',
    topicId: 'top-ppdh-interna',
    semesterId: 'sem-ppdh',
    readTimeMinutes: 14,
    readingTimeMinutes: 14,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['PPDH', 'IGD', 'Terapi Cairan', 'Syok', 'Klinik Interna'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'Clinical Reference',
    sourceDate: '2024/2025',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-tc-1',
        title: '1. Estimasi Derajat Dehidrasi & Rumus Defisit Cairan',
        readingTimeMinutes: 7,
        keyPoints: [
          'Dehidrasi < 5% belum terdeteksi secara fisik.',
          'Dehidrasi 6-8%: Turgor kulit menurun (2-3 detik), mukosa kering, CRT memanjang (2-3 detik).',
          'Dehidrasi 10-12%: Turgor sangat lambat (> 4 detik), mata cekung (enophthalmos), takikardia, pulsus lemah.',
          'Total Cairan 24 Jam = Defisit (Berat kg × % Dehidrasi × 1000 ml) + Rumatan Harian (40-60 ml/kg/hari) + Ongoing Losses (estimasi muntah/diare).'
        ],
        clinicalPearl:
          'Pada syok hipovolemik dekompensasi, berikan shock dose kristaloid isotonik (Ringer Laktat): 80-90 ml/kg pada anjing atau 50-60 ml/kg pada kucing, diberikan secara bolus 1/4 dosis awal selama 15 menit dengan pemantauan tekanan darah.',
        content: `Penilaian Status Dehidrasi Pasien:
- Uji Skin Turgor: Cubit kulit di regio thorakolateral atau servikal. Waktu kembalinya kulit mengindikasikan elastisitas interstitial.
- Kelembapan Membran Mukosa: Periksa gingiva atas. Mukosa yang lengket atau kering menandakan dehidrasi minimal 6-7%.
- Capillary Refill Time (CRT): Tekan gingiva berpigmen pucat dengan ibu jari. CRT normal adalah 1-2 detik. CRT > 2 detik menandakan vasokonstriksi perifer sekunder akibat hipovolemia.

Formula Penghitungan Kebutuhan Cairan 24 Jam:
1. Kebutuhan Defisit:
   Volume (ml) = Berat Badan (kg) × % Dehidrasi × 1000
   Contoh: Anjing 10 kg dengan dehidrasi 8% membutuhkan defisit 10 × 0.08 × 1000 = 800 ml.
2. Kebutuhan Rumatan (Maintenance):
   Kebutuhan basal rata-rata mamalia: 50 ml/kg/hari = 10 × 50 = 500 ml/hari.
3. Kebutuhan Penggantian Ongoing Losses:
   Estimasi cairan hilang akibat muntah profus atau diare cair (misal 200 ml/hari).
Total Cairan Hari Pertama = 800 + 500 + 200 = 1500 ml / 24 jam (~62.5 ml/jam atau ~15 tetes/menit infus makro).`
      }
    ]
  }
  ,
,
  {
    id: 'mat-anatomi-1',
    title: 'Osteologia Komparatif Kranium & Kolumna Vertebralis Mamalia Domestik',
    description: 'Studi komparasi os cranium, foramen magnum, crista sagittalis externa, serta morfologi vertebrae cervicales (atlas dan axis) pada anjing, kucing, sapi, dan kuda.',
    type: 'Lecture Material',
    courseId: 'course-anatomi-vet-1',
    topicId: 'topic-anatomi-osteologi',
    semesterId: 'sem-1',
    readTimeMinutes: 16,
    readingTimeMinutes: 16,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['Anatomi Veteriner', 'Osteologi', 'Kranium', 'Vertebrae', 'Komparatif'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'Module Handbook',
    sourceDate: '2024',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-ana-1',
        title: '1. Komparasi Kranium: Canis, Felis, Bos, dan Equus',
        readingTimeMinutes: 8,
        keyPoints: [
          'Canis familiaris: Crista sagittalis externa berkembang nyata pada ras dolichocephalic, fossa temporalis dalam.',
          'Felis catus: Kranium brachycephalic alami, orbita membulat besar dengan arcus zygomaticus melengkung lateral.',
          'Bos taurus: Os frontale sangat luas membentuk processus cornualis (dasar tanduk), foramen supraorbitale ganda/tunggal.',
          'Equus caballus: Orbita tertutup sempurna oleh processus zygomaticus ossis frontalis, crista facialis sangat menonjol.'
        ],
        clinicalPearl: 'Pada trepanasi sinus paranasalis kuda dan dehorning pedet sapi, penanda anatomis crista facialis dan foramen supraorbitale menjadi pedoman penentuan batas bedah dan blokade anestesi n. cornualis.',
        content: 'Morfologi Komparatif Kranium Mamalia Domestik:\\n1. Karnivora (Canis & Felis):\\n   - Arcus Zygomaticus: Kokoh dan melengkung lateral untuk perlekatan m. masseter kuat.\\n   - Orbita: Tidak lengkap bertulang di bagian kaudal (dibatasi oleh ligamentum orbitale).\\n   - Dentes: Memiliki dentes sectorii (gigi carnasial): P4 atas dan M1 bawah pada anjing.\\n2. Herbivora Besar (Bos & Equus):\\n   - Os Frontale Ruminansia: Mengalami pneumatisasi luas (sinus frontalis) meluas hingga basis tanduk.\\n   - Fossa Temporalis Equus: Dibatasi linea temporalis, crista facialis teraba memanjang dari tuber faciale ke arcus zygomaticus.'
      },
      {
        id: 'sec-ana-2',
        title: '2. Morfologi Vertebrae Cervicales: Atlas & Axis',
        readingTimeMinutes: 8,
        keyPoints: [
          'Atlas (C1): Tidak memiliki corpus vertebrae; tersusun atas arcus dorsalis, arcus ventralis, dan fovea articularis cranialis untuk kondilus os occipitale.',
          'Ala Atlantis: Memiliki foramen alare / incisura alaris serta foramen vertebrale laterale.',
          'Axis (C2): Dicirikan oleh dens axis (processus odontoideus) yang masuk ke fovea dentis atlas dan crista dorsalis yang sangat tinggi.',
          'Gerakan Kepala: Articulatio atlanto-occipitalis berfungsi untuk fleksi-ekstensi (gerakan mengangguk), sedangkan articulatio atlanto-axialis untuk rotasi lateral (gerakan menggeleng).'
        ],
        clinicalPearl: 'Instabilitas atlantoaksial (AA instability) sering terjadi pada anjing ras mini (Toy Poodle, Chihuahua) akibat agenesis dens axis, menyebabkan kompresi medula spinalis servikal dan tetraparesis.',
        content: 'Karakteristik Vertebra C1 dan C2:\\n- Atlas (C1): Fovea articularis cranialis berbentuk mangkuk cekung dalam bersendi dengan condylus occipitalis kranium. Pada sisi ventral terdapat tuberculum ventrale untuk insersi m. longus colli.\\n- Axis (C2): Vertebra servikal terpanjang. Dens axis bertindak sebagai poros pasak rotasi. Pada kuda, dens axis berbentuk konis tumpul, sedangkan pada ruminansia berbentuk setengah silinder (scaphoid) berongga.'
      }
    ]
  },
  {
    id: 'mat-histologi-1',
    title: 'Struktur Mikroanatomi Sistem Kardiovaskular & Endotel Vaskular',
    description: 'Analisis histologis tiga tunika dinding pembuluh darah (intima, media, adventitia), serat Purkinje miokardium, serta perbedaan kapiler continuous, fenestrated, dan sinusoid.',
    type: 'Module Handbook',
    courseId: 'course-histologi-vet-2',
    topicId: 'top-4',
    semesterId: 'sem-3',
    readTimeMinutes: 14,
    readingTimeMinutes: 14,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['Histologi Veteriner', 'Kardiovaskular', 'Endotel', 'Mikroanatomi', 'Purkinje'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'Laboratory Guide',
    sourceDate: '2024',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-his-1',
        title: '1. Tunika Dinding Arteri & Vena Mamalia',
        readingTimeMinutes: 7,
        keyPoints: [
          'Tunica Intima: Terdiri atas endotel selapis gepeng, lamina basalis, dan stratum subendotheliale tipis.',
          'Lamina Elastica Interna: Membran elastis berombak memisahkan tunika intima dari tunika media pada arteri muskular.',
          'Tunica Media: Dominan serat otot polos sirkuler (arteri muskular) atau lembaran serat elastin konsentris (arteri elastis seperti aorta).',
          'Tunica Adventitia: Jaringan ikat kolagen longitudinal mengandung vasa vasorum dan nervi vasorum.'
        ],
        content: 'Histodiferensiasi Pembuluh Darah:\\nArteri elastis (aorta, a. pulmonalis) memiliki tunika media sangat tebal yang kaya akan membrana elastica fenestrata, berfungsi meredam sentakan sistolik ventrikel. Sebaliknya, vena memiliki tunika adventitia paling tebal dengan lumen yang cenderung kolaps pada preparat histologis.'
      }
    ]
  },
  {
    id: 'mat-mikro-1',
    title: 'Bakteriologi Klinis: Identifikasi Staphylococcus pseudintermedius & Streptococcus equi',
    description: 'Karakteristik biologis, pewarnaan Gram, diferensiasi uji katalase-koagulase, dan pola hemolisis pada Blood Agar Plate (BAP) agen pioderma anjing dan strangles kuda.',
    type: 'Clinical Reference',
    courseId: 'course-mikrobiologi-1',
    topicId: 'top-6',
    semesterId: 'sem-3',
    readTimeMinutes: 15,
    readingTimeMinutes: 15,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['Mikrobiologi Veteriner', 'Bakteriologi', 'Staphylococcus', 'Streptococcus', 'Gram Positif'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'RPKPS Course Notes',
    sourceDate: '2024',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-mik-1',
        title: '1. Diagnostik Laboratorium Staphylococcus pseudintermedius',
        readingTimeMinutes: 8,
        keyPoints: [
          'Morfologi: Sel kokus Gram positif berpasangan atau berkelompok mirip untaian anggur (grape-like clusters).',
          'Uji Katalase: Positif kuat (pembentukan gelembung oksigen instan saat ditetesi H2O2 3%).',
          'Uji Koagulase: Positif (menggumpalkan plasma darah kelinci/anjing dalam waktu 4-24 jam).',
          'Pola Hemolisis: Beta-hemolisis ganda (zona jernih komplit dikelilingi zona parsial) pada BAP domba 5%.'
        ],
        clinicalPearl: 'Staphylococcus pseudintermedius resisten metisilin (MRSP) merupakan ancaman zoonotik dan nosokomial utama di rumah sakit hewan; pemilihan antibiotik harus selalu dipandu uji kepekaan difusi cakram Kirby-Bauer.',
        content: 'Patogenesis & Identifikasi:\\nS. pseudintermedius adalah patogen oportunistik nomor satu penyebab pioderma profunda, otitis eksterna purulenta, dan infeksi luka pasca operasi pada anjing. Faktor virulensi mencakup eksfoliatin toksin (SIET, EXI), leukosidin, enterotoksin, dan biofilm tebal.'
      }
    ]
  },
  {
    id: 'mat-parasit-1',
    title: 'Daur Hidup, Imunopatogenesis, & Diagnosis Trematodiasis Fasciola gigantica',
    description: 'Biologi cacing hati tropis pada sapi dan kerbau: stadium serkaria, siput inang antara Lymnaea rubiginosa, kerusakan hepar mekanis, dan metode sedimentasi tinja.',
    type: 'Module Handbook',
    courseId: 'course-parasitologi-1',
    topicId: 'top-2',
    semesterId: 'sem-3',
    readTimeMinutes: 16,
    readingTimeMinutes: 16,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['Parasitologi Veteriner', 'Helmintologi', 'Fasciola', 'Trematoda', 'Ruminansia'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'Module Handbook',
    sourceDate: '2024',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-par-1',
        title: '1. Siklus Hidup & Epidemiologi Fasciolosis Tropika',
        readingTimeMinutes: 8,
        keyPoints: [
          'Inang Definitif: Sapi, kerbau, kambing, domba, dan manusia (zoonosis).',
          'Inang Antara: Siput air tawar Lymnaea rubiginosa.',
          'Stadium Infektif: Metaserkaria yang menempel encysted pada vegetasi rumput lapangan basah.',
          'Migrasi Parenkim: Cacing muda menembus dinding usus, menembus kapsula Glisson hepar, menyebabkan hepatitis parenkimatosa traumatika.'
        ],
        content: 'Patofisiologi Infeksi Cacing Hati:\\nDi saluran empedu, cacing dewasa mengisap darah dan melepaskan prolin yang memicu fibrosis periportal dan kalsifikasi duktus biliaris (pipe-stem liver). Gejala klinis meliputi penurunan bobot badan drastis, anemia hipokromik mikrositik, dan edema submandibular (bottle jaw).'
      }
    ]
  },
  {
    id: 'mat-farmako-1',
    title: 'Farmakokinetika Klinis & Multimodal Analgesia Veteriner',
    description: 'Perhitungan parameter ADME, volume distribusi (Vd), klirens renal, selektivitas penghambatan COX-1 vs COX-2, dan protokol analgesia perioperatif pada anjing dan kucing.',
    type: 'Clinical Reference',
    courseId: 'course-farmakologi-umum',
    topicId: 'top-8',
    semesterId: 'sem-3',
    readTimeMinutes: 15,
    readingTimeMinutes: 15,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['Farmakologi Veteriner', 'Analgesia', 'NSAID', 'Farmakokinetika', 'Anestesi'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'RPKPS Course Notes',
    sourceDate: '2024',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-far-1',
        title: '1. Parameter Farmakokinetika Klinis Dasar',
        readingTimeMinutes: 7,
        keyPoints: [
          'Bioavailabilitas (F): Fraksi obat utuh yang mencapai sirkulasi sistemik pasca rute ekstravaskular (IV = 100%).',
          'Volume Distribusi (Vd): Volume teoritis cairan tubuh yang diperlukan untuk melarutkan jumlah total obat dengan konsentrasi sama dengan plasma.',
          'Waktu Paruh Eliminasi (t1/2): Waktu yang diperlukan agar konsentrasi obat dalam plasma berkurang 50%.',
          'Steady State: Tercapai setelah 4 sampai 5 kali waktu paruh eliminasi pada pemberian dosis berulang.'
        ],
        content: 'Prinsip Penentuan Dosis Terapeutik:\\nLoading Dose = (Target Konsentrasi Efektif * Vd) / F.\\nMaintenance Dose Rate = (Target Konsentrasi Efektif * Klirens) / F.\\nKucing memiliki defisiensi enzim glukuronil transferase hepar sehingga sangat sensitif terhadap toksisitas parasetamol dan memerlukan interval pemberian NSAID yang lebih panjang.'
      }
    ]
  },
  {
    id: 'mat-patologi-1',
    title: 'Prinsip Patologi Jejas Seluler, Nekrosis Organ, & Radang Granulomatosa',
    description: 'Diferensiasi nekrosis koagulativa, likuefaktiva, kaseosa, dan enzimatik lemak; pembentukan sel raksasa Langhans; serta teknik nekropsi diagnostik organ mamalia.',
    type: 'Module Handbook',
    courseId: 'course-patologi-umum',
    topicId: 'top-10',
    semesterId: 'sem-4',
    readTimeMinutes: 16,
    readingTimeMinutes: 16,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['Patologi Veteriner', 'Nekrosis', 'Histopatologi', 'Radang', 'Nekropsi'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'Module Handbook',
    sourceDate: '2024',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-pat-1',
        title: '1. Pola Morfologis Nekrosis Jaringan',
        readingTimeMinutes: 8,
        keyPoints: [
          'Nekrosis Koagulativa: Arsitektur dasar jaringan tetap dipertahankan selama beberapa hari; khas pada infark iskemia miokardium atau ginjal.',
          'Nekrosis Likuefaktiva: Jaringan mengalami lisis enzimatik menjadi massa cair kental/nanah; khas pada infark SSP otak dan abses bakteri piogenik.',
          'Nekrosis Kaseosa: Jaringan menyerupai massa putih kekuningan seperti keju rapuh; patognomonis pada tuberkulosis hewan dan aspergilosis unggas.',
          'Nekrosis Lemak: Terjadi akibat pelepasan lipase pankreas teraktivasi yang menyabunkan trigliserida perirenal (fat saponification).'
        ],
        content: 'Perubahan Inti Sel pada Kematian Sel:\\n1. Piknosis: Kondensasi kromatin inti menjadi massa gelap padat kecil.\\n2. Karioreksis: Fragmentasi inti sel menjadi butiran-butiran kromatin.\\n3. Kariolisis: Pelarutan dan hilangnya basofilia kromatin oleh endonuklease.'
      }
    ]
  },
  {
    id: 'mat-diagnostik-1',
    title: 'Prosedur Pemeriksaan Fisik & Auskultasi Jantung Paru Hewan Kecil',
    description: 'SOP pemeriksaan status praesens: pulsus femoralis, warna membrana mukosa, CRT, puncta maxima auskultasi katup PAM-T, dan diferensiasi bising murmur kardiak.',
    type: 'Clinical Reference',
    courseId: 'course-diagnostik-klinik',
    topicId: 'top-1',
    semesterId: 'sem-5',
    readTimeMinutes: 15,
    readingTimeMinutes: 15,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: ['Diagnostik Klinik', 'Pemeriksaan Fisik', 'Auskultasi', 'Kardiologi', 'Hewan Kecil'],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'Clinical Reference',
    sourceDate: '2024',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-diag-1',
        title: '1. Langkah Sistematik Status Praesens',
        readingTimeMinutes: 8,
        keyPoints: [
          'Temperatur Rektal Normal: Anjing (38.0 - 39.2 °C), Kucing (38.0 - 39.5 °C).',
          'Frekuensi Pulsus Normal: Anjing (70 - 140 kali/menit), Kucing (140 - 220 kali/menit).',
          'Frekuensi Pernafasan: Anjing (15 - 30 kali/menit), Kucing (20 - 30 kali/menit).',
          'Puncta Maxima PAM-T: Pulmonal (IC 3 kiri ventral), Aorta (IC 4 kiri setinggi bahu), Mitral (IC 5 kiri apex), Trikuspidal (IC 4 kanan ventral).'
        ],
        content: 'Evaluasi Pulsus Femoralis Simultan:\\nRaba arteri femoralis di medial paha sambil melakukan auskultasi apeks jantung. Defisit pulsus (detak jantung terdengar namun tidak diikuti gelombang pulsus perifer) mengindikasikan aritmia kontraksi ventrikel prematur (VPC) atau fibrilasi atrium.'
      }
    ]
  },
  {
    id: 'mat-kesmavet-1',
    title: 'Higiene Daging, Sistem Keamanan Pangan ASUH, & Pengawasan RPH',
    description: 'Prinsip Aman, Sehat, Utuh, Halal (ASUH); biokimia konversi otot menjadi daging (rigor mortis, pH decline); uji kebusukan; dan standar HACCP Rumah Potong Hewan.',
    type: 'Module Handbook',
    courseId: 'course-kesmavet-1',
    topicId: 'top-6',
    semesterId: 'sem-5',
    readTimeMinutes: 15,
    readingTimeMinutes: 15,
    isSaved: false,
    isCompleted: false,
    progressPercent: 0,
    tags: [
      'Kesmavet',
      'Keamanan Pangan',
      'Higiene Daging',
      'RPH',
      'ASUH',
      'Zoonosis'
    ],
    updatedAt: '2026-09-15',
    source: 'FKH UGM',
    sourceUrl: 'https://fkh.ugm.ac.id',
    sourceType: 'Module Handbook',
    sourceDate: '2024',
    retrievedAt: '2026-09-15',
    verified: true,
    contentCategory: 'officialContent',
    status: 'published',
    sections: [
      {
        id: 'sec-kes-1',
        title: '1. Konversi Otot Menjadi Daging & Pengujian Kebusukan',
        readingTimeMinutes: 8,
        keyPoints: [
          'Penurunan pH Post-Mortem: Glikogenolisis anaerob menghasilkan asam laktat, menurunkan pH dari 7.0 menjadi ultimate pH 5.4 - 5.8.',
          'Daging DFD (Dark, Firm, Dry): Akibat stres kronis sebelum potong yang menguras cadangan glikogen, pH akhir tetap tinggi (> 6.2).',
          'Daging PSE (Pale, Soft, Exudative): Akibat stres akut hipertermik memicu penurunan pH sangat cepat saat karkas masih panas.',
          'Uji Kebusukan Awal: Uji Eber (deteksi gas NH3 bebas dengan HCl pekat) dan Uji Postma (kertas lakmus pH).'
        ],
        content: 'Sistem Pengawasan Keamanan Pangan Hewani:\\nPemeriksaan antemortem wajib dilakukan maksimal 24 jam sebelum pemotongan untuk mengidentifikasi gejala penyakit zoonotik (antraks, rabies, BSE). Pemeriksaan postmortem memeriksa kelenjar limfa mandibularis, retropharyngealis, mediastinalis, serta inspeksi hepar dan pulmo.'
      }
    ]
  }
];
