/*
kont = 0
muhafiz kumandani= 1
Vali = 2
lonca baskani= 3 
basrahip= 4
muhafizeri = 5
muhtar= 6
rah'p= 7
demirci=8
terzi=9
hanci=10
seyis=11
isyancilideri=12
ormanhaydut=13
ayrilikcilar=14
isyanaskeri=15
ciftlik sahibi=16
capulcu=17
kelle avcisi= 18
ciftci= 19
kumarbaz= 20
gammazci= 21
marangoz=22
yalensiginmaci=23
*/


const desc = [
/* 0 */    'Şehir ve çevresindeki toprakların yöneticisidir. Şehri, Kral adına yöneten kişidir. Şehir içerisinde sivillerin güvenliğini ve Krallığın çıkarlarını korumakla yükümlüdür. . Şehrin iç düzeni ile ilgili kararları verir. Vali ve Muhafız kumandanı, Kont\'a hizmet eder. İsyan iddialarına karşı Kont, yönetiminin meşruluğunu kanıtlamalı ve devam ettirmelidir.',
/* 1 */    'Şehirin güvenliğini sağlayan en üst yetkili kişidir. .Şehrin güvenliğinden sorumludur,şehir muhafızlarını yönetir. Muhafızların teçhizatlarını, devriyelerini ve eğitimlerini düzenler.',
/* 2 */    'Şehrin iç meseleleri ile ilgilenen kişidir. Diyarda yaşayan insanlardan vergi toplar ve bu vergileri Kont\'a iletir. Krallığın ihtiyacı olan malzemeleri temin etmek ve şehrin iç güvenliği için muhafız kumandanı ile ortak çalışmakla yükümlüdür.Şehrin refahını arttırmak ve ekonomiyi güçlendirmek için çalışır. Kont\'a bağlıdır.',
/* 3 */    'Halkın meslek sahibi olmasını kolaylaştıran, iş dağıtan kişidir.Lonca kendisinin yönetimindedir.',
/* 4 */    'Kilisenin başındaki kişidir. Kilisedeki ayinleri düzenler. Rahiplerin eğitim görmesini sağlar. ',
/* 5 */    'Kumandanın emri altındadır.Şehrin güvenliğiyle sorumludur.',
/* 6 */    'Köyü yöneten kişidir.Köyden ve işçilerinden sorumludur.',
/* 7 */    'Hristiyanlığa mensup, kiliseye bağlı kişilerdir. Hayatlarını kiliseye adarlar.',
/* 8 */    'Silah zırh ok yay kalkan vb. eşyaları üreten kişidir. ',
/* 9 */    'Şehirde kendi atölyesinde kıyafet diken kişidir. ',
/* 10 */    'Şehrin içindeki hanın sahibidir.Yiyecek, içecek, konaklama burada bulunur.',
/* 11 */    'Atları yetiştiren kişidir.At bu kişiden temin edilmelidir.',
/* 12 */    'Karthas Kontunun tahtını çaldığını, gerçek varisin kendisi olması gerektiğini iddia eden kişidir. Senaryo boyunca ifşa edilmeden safına destekçiler bulmalı ve hakkı olan taht\'ı almalıdır.',
/* 13 */    'Şehirin dışında terör estiren, haraç kesen haydutların lideridir.',
/* 14 */    'Svadya Krallığının meşru olmadığını, İmparatorluğun geri dönmesini isteyen bir isyancı grubudur. Bu grubun amacı, Svadya Krallığında bir isyan çıkartmaktır. Bu isyan, halkı ön planda tutarak sadece zorunda kalındığında kan dökerek İmparatorluğun geri dönmesini sağlamakır.',
/* 15 */    'İsyancı\'nın hak iddiasını tanıyan, onun tahtın meşru varisi olarak tanıyan destekçilerdir. Bu kişilerin amacı, İsyancı\'ya bağlı olarak onun hakkı olan tahtı geri almak.',
/* 16 */    'Karthas topraklarında bir çiftliğin sahibidir. Bu rolü yapacak kişiler aile olarak başvurmalıdır.',
/* 17 */    'cabulcular',
/* 18 */    'Suçluları para karşılığında ölü ya da canlı şekilde şehir muhafızlarına teslim eden kişilerdir.',
/* 19 */    'Çiftlik sahibinin görevlendirdiği işleri yapmakla yükümlüdür. Ailenin parçasıdır.',
/* 20 */    'İnsanları kumara teşvik eder ve para döndürür.',
/* 21 */    'Şehrin içinden bilgiler sızdıran casustur.',
/* 22 */    'Ev,köprü,oyma ve benzeri işleri yapar.',
/* 23 */    'Yalen Şehrindeki istiladan sonra Karthas Şehrine sığınan kişilerdir.'
]

module.exports = desc