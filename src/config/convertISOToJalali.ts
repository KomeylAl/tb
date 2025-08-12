function gregorianToJalali(gy: number, gm: number, gd: number) {
  const g_d_m = [0, 31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  if ((gy % 4 === 0 && gy % 100 !== 0) || gy % 400 === 0) g_d_m[2] = 29;

  const gy2 = gm > 2 ? gy + 1 : gy;
  let days =
      355666 +
      365 * gy +
      Math.floor((gy2 + 3) / 4) -
      Math.floor((gy2 + 99) / 100) +
      Math.floor((gy2 + 399) / 400);

  for (let i = 0; i < gm; i++) days += g_d_m[i];
  days += gd;

  let jy = -1595 + 33 * Math.floor(days / 12053);
  days %= 12053;
  jy += 4 * Math.floor(days / 1461);
  days %= 1461;

  if (days > 365) {
    jy += Math.floor((days - 1) / 365);
    days = (days - 1) % 365;
  }

  let jm, jd;
  if (days < 186) {
    jm = 1 + Math.floor(days / 31);
    jd = 1 + (days % 31);
  } else {
    jm = 7 + Math.floor((days - 186) / 30);
    jd = 1 + ((days - 186) % 30);
  }

  return [jy, jm, jd];
}

export function convertISOToJalali(isoDate: number) {
  const date = new Date(isoDate);
  const [jy, jm, jd] = gregorianToJalali(
      date.getFullYear(),
      date.getMonth() + 1,
      date.getDate()
  );

  // ساخت خروجی به‌صورت رشته‌ای
  return `${jy}/${jm.toString().padStart(2, "0")}/${jd
      .toString()
      .padStart(2, "0")} ${date.getHours().toString().padStart(2, "0")}:${date
      .getMinutes()
      .toString()
      .padStart(2, "0")}:${date.getSeconds().toString().padStart(2, "0")}`;
}