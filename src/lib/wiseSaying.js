const wiseSayings = [
  {
    text: '독서같이 값싸게 주어지는 영속적인 쾌락은 또 없다',
    by: '몽테뉴',
  },
  {
    text:
      '생애에서 몇 번이고 되풀이해 읽을 수 있는<br/>한 권의 책을 가진 사람은 행복한 사람이다.<br/>더욱이 여러 권의 책을 가진 사람은 행복을 다한 사람이다.',
    by: '몽테를랑',
  },
  {
    text:
      '나쁜 책을 읽지 않는 것은 좋은 책을 읽기 위한 조건이다. <br/>인생은 짧고 시간과 능력에는 한계가 있다. ',
    by: '쇼펜하우어',
  },
  {
    text: '친구를 고르듯이 저자를 고르라 ',
    by: '로스코몬',
  },
  {
    text: '생각하지 않고 읽는 것은 씹지 않고 식사하는 것과 같다. ',
    by: 'E. 버크',
  },
  {
    text:
      '과학에서는 최신의 연구서를 읽으라.<br/>문학에서는 최고(最古)의 책을 읽으라.<br/>고전은 항상 새로운 것이다.',
    by: '리턴',
  },
  {
    text:
      '시간이 없어서 공부하지 못한다고 하는 사람은 <br/>시간이 있어도 공부하지 못한다.',
    by: '회남자',
  },
  {
    text:
      '방구석에서 말 없는 나의 종(책)이 기다린다.<br/>언제나 변함없는 나의 친구들이다. ',
    by: 'B. W. 프록터',
  },
  {
    text:
      '아직 읽지 못한 책을 읽는 것은 <br/>새로운 좋은 친구를 얻는 것과 같고, <br/>이미 읽은 책을 다시 읽는 것은<br/>죽은 친구를 만나는 것과 같다.<br/>',
    by: '안지추',
  },
  {
    text:
      '어떤 책은 맛보고, 어떤 책은 삼키고,<br/>소수의 어떤 책은 잘 씹어서 소화해야 한다. ',
    by: '베이컨',
  },
  {
    text:
      '독서는 정신적으로 충실한 사람을 만든다.<br/>사색은 사려 깊은 사람을 만든다. <br/>그리고 논술은 확실한 사람을 만든다. <br/>',
    by: '벤저민 프랭클린',
  },
  {
    text:
      '사색하는 데 요령이 있는 것처럼<br/>쓰는 데에도 요령이 있으며,<br/>독서하는 데에도 요령이 있다.<br/>',

    by: '디즈레일리',
  },
  {
    text:
      '당신에게 가장 필요한 책은 당신으로 하여금<br/>가장 많이 생각하게 하는 책이다.<br/>',
    by: '마크 트웨인',
  },
  {
    text:
      '때로 독서란 독자를 가르친다기보다<br/>그들의 머리를 도리어 산만하게 한다.<br/>덮어놓고 많은 책을 읽는 것보다<br/>몇 몇 좋은 저자의 책을 골라 읽는 편이 훨씬 유익하다.<br/>',
    by: '톨스토이',
  },
  {
    text:
      '독서만 하고 사고가 없는 사람은<br/>그저 먹기만 하려는 대식가와 같다.<br/>아무리 영양 많고 맛 좋은 음식이라도<br/>위액을 통해 소화하지 않고서는 아무런 이로움이 없다.<br/>',
    by: '실베스터',
  },
  {
    text:
      '독서는 다만 지식의 재료를 줄 뿐,<br/>그 자신의 것을 만드는 것은 사색의 힘이다.',
    by: '',
  },
  {
    text:
      '독서는 충실한 인간을 만들고,<br/>회의는 의지가 굳센 인간을 만들며,<br/>쓰기는 정확한 인간을 만든다.<br/>',
    by: '베이컨',
  },
  {
    text:
      '책이 없는 백만장자가 되느니보다<br/>차라리 책과 더불어 살 수 있는 거지가 되는 것이 한결 낫다.',
    by: 'D. R. 매콜리',
  },
  {
    text:
      '기록을 살펴보면 사람이 늙어가며 겪는 생활의 가치는<br/>그 사람이 사는 동안에 얼마나 책을 읽었는가에 따라서 달라진다.<br/>',
    by: '아놀드',
  },
  {
    text:
      '그 사람이 읽는 책을 보면<br/>그 사람의 성격을 자연히 알 수 있다.<br/>',
    by: 'W. 차몬드',
  },
];
const { length } = wiseSayings;

const getRandom = () => {
  const min = 0;
  const max = Math.floor(length);
  return wiseSayings[Math.floor(Math.random() * (max - min)) + min];
};

export { getRandom };
