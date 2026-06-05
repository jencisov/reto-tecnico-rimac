export const calculateAge = (birthDay: string | undefined): number => {
  if (!birthDay) return 0;

  const [day, month, year] = birthDay.split('-').map(Number);
  if (!day || !month || !year) return 0;

  const today = new Date();
  const monthDiff = today.getMonth() + 1 - month;
  const isBeforeBirthday =
    monthDiff < 0 || (monthDiff === 0 && today.getDate() < day);

  return today.getFullYear() - year - (isBeforeBirthday ? 1 : 0);
};
