const getAvatarUri = (
  avatarStyle,
  topType,
  accessoriesType,
  hairColor,
  facialHairType,
  clotheType,
  eyeType,
  eyebrowType,
  mouthType,
  skinColor
) => {
  return `https://avataaars.io/?avatarStyle=${avatarStyle}&topType=${topType}&accessoriesType=${accessoriesType}&hairColor=${hairColor}&facialHairType=${facialHairType}&clotheType=${clotheType}&eyeType=${eyeType}&eyebrowType=${eyebrowType}&mouthType=${mouthType}&skinColor=${skinColor}`;
};

const AVATAR_STYLE = ['Circle', 'Transparent'];
const Top_TYPE = [
  'NoHair',
  'Eyepatch',
  'Hat',
  'Hijab',
  'LongHairStraight2',
  'ShortHairDreads01',
];

const ACCESSORIES_TYPE = [
  'Blank',
  'Kurt',
  'Prescription01',
  'Sunglasses',
];

const HAT_COLOR = [
  'Black',
  'Blue01',
  'Gray01',
  'Pink',
  'Red',
  'White'
];

const FACIAL_HAIR = [
  'Blank',
  'BeardMedium',
  'BeardLight',
  'MoustacheFancy',
];

const CLOTHE = [
  'BlazerShirt',
  'BlazerSweater',
  'GraphicShirt',
  'Hoodie',
  'Overall',
];

const EYES = [
  'Close',
  'Cry',
  'Dizzy',
  'Happy',
  'Hearts',
  'Surprised',
];

const EYE_BROW = [
  'Angry',
  'Default',
  'FlatNatural',
  'RaisedExcited',
];

const MOUTH = [
  'Default',
  'Eating',
  'Sad',
  'Serious',
  'Smile',
  'Tongue',
];

const SKINCOLOR = [
  'Pale',
  'Light',
  'Brown',
  'DarkBrown',
  'Black'
];

const HAIR_COLOR = [
  'Black',
  'Blonde',
  'Brown',
  'Blue',
  'Red',
];

const Top_TYPE_ALL_OPTIONS = [
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

const ACCESSORIES_TYPE_ALL_OPTIONS = [
  'Blank',
  'Kurt',
  'Prescription01',
  'Prescription02',
  'Round',
  'Sunglasses',
  'Wayfarers'
];

const HAT_COLOR_ALL_OPTIONS = [
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

const FACIAL_HAIR_ALL_OPTIONS = [
  'Blank',
  'BeardMedium',
  'BeardLight',
  'BeardMajestic',
  'MoustacheFancy',
  'MoustacheMagnum'
];

const CLOTHE_ALL_OPTIONS = [
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

const EYES_ALL_OPTIONS = [
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

const EYE_BROW_ALL_OPTIONS = [
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

const MOUTH_ALL_OPTIONS = [
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

const SKINCOLOR_ALL_OPTIONS = [
  'Tanned',
  'Yellow',
  'Pale',
  'Light',
  'Brown',
  'DarkBrown',
  'Black'
];

const HAIR_COLOR_ALL_OPTIONS = [
  'Auburn',
  'Black',
  'Blonde',
  'BlondeGolden',
  'Brown',
  'BrownDark',
  'PastelPink',
  'Blue',
  'Platinum',
  'Red',
  'SilverGray'
];

export const avatarDefaults = {
  avatarStyle: 'Circle',
  topType: 'LongHairNotTooLong',
  accessoriesType: 'Prescription02',
  hairColor: 'Blonde',
  facialHairType: 'Blank',
  clotheType: 'BlazerSweater',
  eyeType: 'Close',
  eyebrowType: 'Default',
  mouthType: 'Default',
  skinColor: 'Pale'
};

export const defaultAvatarUri =
  'https://avataaars.io/?avatarStyle=Circle&topType=LongHairNotTooLong&accessoriesType=Prescription02&hairColor=Blonde&facialHairType=Blank&clotheType=BlazerSweater&eyeType=Close&eyebrowType=Default&mouthType=Default&skinColor=Pale';

export const getRandomisedAvatarOptions = () => {
  const randomiser = (upperbound) => Math.floor(Math.random() * upperbound);
  const randomOptions = {
    avatarStyle: AVATAR_STYLE[randomiser(AVATAR_STYLE.length)],
    topType: Top_TYPE_ALL_OPTIONS[randomiser(Top_TYPE_ALL_OPTIONS.length)],
    accessoriesType: ACCESSORIES_TYPE_ALL_OPTIONS[randomiser(ACCESSORIES_TYPE_ALL_OPTIONS.length)],
    hairColor: HAIR_COLOR_ALL_OPTIONS[randomiser(HAIR_COLOR_ALL_OPTIONS.length)],
    facialHairType: FACIAL_HAIR_ALL_OPTIONS[randomiser(FACIAL_HAIR_ALL_OPTIONS.length)],
    clotheType: CLOTHE_ALL_OPTIONS[randomiser(CLOTHE_ALL_OPTIONS.length)],
    eyeType: EYES_ALL_OPTIONS[randomiser(EYES_ALL_OPTIONS.length)],
    eyebrowType: EYE_BROW_ALL_OPTIONS[randomiser(EYE_BROW_ALL_OPTIONS.length)],
    mouthType: MOUTH_ALL_OPTIONS[randomiser(MOUTH_ALL_OPTIONS.length)],
    skinColor: SKINCOLOR_ALL_OPTIONS[randomiser(SKINCOLOR_ALL_OPTIONS.length)]
  };

  //console.log('random', randomOptions);

  return randomOptions;
};

export const AVATAR_OPTIONS = [
  {
    varName: 'accessoriesType',
    title: 'Accessories',
    icon: '👓',
    data: ACCESSORIES_TYPE
  },
  { varName: 'mouthType', title: 'Mouth', icon: '👄', data: MOUTH },
  { varName: 'clotheType', title: 'Clothe', icon: '👔 ', data: CLOTHE },
  { varName: 'eyeType', title: 'Eyes', icon: '👁', data: EYES },
  {
    varName: 'avatarStyle',
    title: 'Avatar Style',
    icon: '',
    data: AVATAR_STYLE
  },
  { varName: 'topType', title: 'Top', icon: '', data: Top_TYPE },
  { varName: 'hairColor', title: 'Hair Color', icon: '💈', data: HAT_COLOR },
  {
    varName: 'facialHairType',
    title: 'Facial Hair',
    icon: '',
    data: FACIAL_HAIR
  },
  { varName: 'skinColor', title: 'Skin Tone', icon: '', data: SKINCOLOR },
  { varName: 'eyebrowType', title: 'Eye Brow', icon: ' ', data: EYE_BROW }
];

export default getAvatarUri;
