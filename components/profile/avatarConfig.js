const getAvatarUri = (
  avatarStyle = 'Circle',
  topType = 'LongHairNotTooLong',
  accessoriesType = 'Prescription02',
  hairColor = 'Blonde',
  facialHairType = 'Blank',
  clotheType = 'BlazerSweater',
  eyeType = 'Close',
  eyebrowType = 'Default',
  mouthType = 'Default',
  skinColor = 'Yellow'
) => {
  return `https://avataaars.io/?avatarStyle=${avatarStyle}&topType=${topType}&accessoriesType=${accessoriesType}&hairColor=${hairColor}&facialHairType=${facialHairType}&clotheType=${clotheType}&eyeType=${eyeType}&eyebrowType=${eyebrowType}&mouthType=${mouthType}&skinColor=${skinColor}`;
};
export default getAvatarUri;

export const AVATAR_OPTIONS = [
  { option: 'Accessories', icon: '👓' },
  { option: 'Mouth', icon: '👄' },
  { option: 'Clothe', icon: '👔 ' },
  { option: 'Eyes', icon: '👁' },
  { option: 'Avatar Style', icon: '' },
  { option: 'Top', icon: '' },
  { option: 'Hat Color', icon: '' },
  { option: 'Facial Hair', icon: '' },
  { option: 'Skin Tone', icon: '' },
  { option: 'Eye Brow', icon: ' ' }
];

export const AVATAR_STYLE = ['Circle', 'Transparent'];
export const Top_TYPE = [
  'NoHair',
  'Eyepatch',
  'Hat',
  'Hijab',
  'Turban',
  'WinterHat1',
  'WinterHat2',
  'WinterHat3',
  'WinterHat4',
  'LongHairBigHair',
  'LongHairBob',
  'LongHairBun',
  'LongHairCurly',
  'LongHairCurvy',
  'LongHairDreads',
  'LongHairFrida',
  'LongHairFro',
  'LongHairFroBand',
  'LongHairNotTooLong',
  'LongHairShavedSides',
  'LongHairMiaWallace',
  'LongHairStraight',
  'LongHairStraight2',
  'LongHairStraightStrand',
  'ShortHairDreads01',
  'ShortHairDreads02',
  'ShortHairFrizzle',
  'ShortHairShaggyMullet',
  'ShortHairShortCurly',
  'ShortHairShortFlat',
  'ShortHairShortRound',
  'ShortHairShortWaved',
  'ShortHairSides',
  'ShortHairTheCaesar',
  'ShortHairTheCaesarSidePart'
];

export const ACCESSORIES_TYPE = [
  'Blank',
  'Kurt',
  'Prescription01',
  'Prescription02',
  'Round',
  'Sunglasses',
  'Wayfarers'
];

export const HAT_COLOR = [
  'Black',
  'Blue01',
  'Blue02',
  'Blue03',
  'Gray01',
  'Gray02',
  'Heather',
  'PastelBlue',
  'PastelGreen',
  'PastelOrange',
  'PastelRed',
  'PastelYellow',
  'Pink',
  'Red',
  'White'
];

export const FACIAL_HAIR = [
  'Blank',
  'BeardMedium',
  'BeardLight',
  'BeardMajestic',
  'MoustacheFancy',
  'MoustacheMagnum'
];

export const CLOTHE = [
  'BlazerShirt',
  'BlazerSweater',
  'CollarSweater',
  'GraphicShirt',
  'Hoodie',
  'Overall',
  'ShirtCrewNeck',
  'ShirtScoopNeck',
  'ShirtVNeck'
];

export const EYES = [
  'Close',
  'Cry',
  'Default',
  'Dizzy',
  'EyeRoll',
  'Happy',
  'Hearts',
  'Side',
  'Squint',
  'Surprised',
  'Wink',
  'WinkWacky'
];

export const EYE_BROW = [
  'Angry',
  'AngryNatural',
  'Default',
  'DefaultNatural',
  'FlatNatural',
  'RaisedExcited',
  'RaisedExcitedNatural',
  'SadConcerned',
  'SadConcernedNatural',
  'UnibrowNatural',
  'UpDown',
  'UpDownNatural'
];

export const MOUTH = [
  'Concerned',
  'Default',
  'Disbelief',
  'Eating',
  'Grimace',
  'Sad',
  'ScreamOpen',
  'Serious',
  'Smile',
  'Tongue',
  'Twinkle',
  'Vomit'
];

export const SKINCOLOR = [
  'Tanned',
  'Yellow',
  'Pale',
  'Light',
  'Brown',
  'DarkBrown',
  'Black'
];
