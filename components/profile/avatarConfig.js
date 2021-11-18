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

const AVATAR_STYLE = ['Circle', 'Transparent'];
const Top_TYPE = [
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

const ACCESSORIES_TYPE = [
  'Blank',
  'Kurt',
  'Prescription01',
  'Prescription02',
  'Round',
  'Sunglasses',
  'Wayfarers'
];

const HAT_COLOR = [
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

const FACIAL_HAIR = [
  'Blank',
  'BeardMedium',
  'BeardLight',
  'BeardMajestic',
  'MoustacheFancy',
  'MoustacheMagnum'
];

const CLOTHE = [
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

const EYES = [
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

const EYE_BROW = [
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

const MOUTH = [
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

const SKINCOLOR = [
  'Tanned',
  'Yellow',
  'Pale',
  'Light',
  'Brown',
  'DarkBrown',
  'Black'
];

export const AVATAR_OPTIONS = [
  { option: 'Accessories', icon: '👓', data: ACCESSORIES_TYPE },
  { option: 'Mouth', icon: '👄', data: MOUTH },
  { option: 'Clothe', icon: '👔 ', data: CLOTHE },
  { option: 'Eyes', icon: '👁', data: EYES },
  { option: 'Avatar Style', icon: '', data: AVATAR_STYLE },
  { option: 'Top', icon: '', data: Top_TYPE },
  { option: 'Hat Color', icon: '', data: HAT_COLOR },
  { option: 'Facial Hair', icon: '', data: FACIAL_HAIR },
  { option: 'Skin Tone', icon: '', data: SKINCOLOR },
  { option: 'Eye Brow', icon: ' ', data: EYE_BROW }
];

export default getAvatarUri;
