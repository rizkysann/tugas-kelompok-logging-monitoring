import http from 'k6/http';
import { check, sleep } from 'k6';

// Fungsi yang membuat beban CPU tinggi dengan perhitungan
function cpuIntensiveWork() {
  let n = 0;
  for (let i = 0; i < 1000000000; i++) {
    n += i;
  }
  return n;
}

export default function () {
  // Mengirim request HTTP untuk menguji server
  let res = http.get('http://54.172.2.28/');
  
  // Mengecek status code
  check(res, {
    'is status 200': (r) => r.status === 200,
  });
  
  // Operasi CPU-intensive untuk menambah beban CPU
  cpuIntensiveWork();
  
  // Menggunakan sleep untuk memperlambat request, meningkatkan penggunaan memori dan CPU
  sleep(0.5); // Tunda setengah detik antara setiap request untuk mengurangi kecepatan request
}
