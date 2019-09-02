export function getNameInitials(name) {
  var nameInitials = name.match(/\b(\w)/g).join('');
  return nameInitials;
}
