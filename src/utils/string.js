export function getNameInitials(name = '') {
  const nameInitials = name.match(/\b(\w)/g).join('');
  return nameInitials;
}
