import { useEffect, useMemo, useState } from 'react';
import CategoryTabs from './CategoryTabs.jsx';
import QuestionCard from './QuestionCard.jsx';
import ScoreBadge from './ScoreBadge.jsx';
import ResultPanel from './ResultPanel.jsx';

const QUESTIONS = [
  { id: 'q1', cat: '문학', text: '셰익스피어 4대 비극에 해당하지 않는 작품은?', 
    choices: ['리어왕','로미오와 줄리엣','햄릿','맥베스'], answer: 1 },
      { id: 'q2', cat: '문학', text: '"키다리 아저씨"의 작가는?', 
    choices: ['진 웹스터','루이자 메이 올컷','샬럿 브론테','에밀리 브론테'], answer: 0 },
  // 동물
  { id: 'q3',  cat: '동물', text: '지상에서 가장 빠른 육상 동물은?', 
    choices: ['치타', '사자', '영양', '표범'], answer: 0 },
  { id: 'q4',  cat: '동물', text: '펭귄이 자연에서 주로 사는 곳은?', 
    choices: ['북극', '남극', '사하라 사막', '히말라야'], answer: 1 },

  // 과학
  { id: 'q5',  cat: '과학', text: '물의 화학식은?', 
    choices: ['H₂O', 'CO₂', 'O₂', 'NaCl'], answer: 0 },
  { id: 'q6',  cat: '과학', text: '지구 대기에서 가장 많은 기체는?', 
    choices: ['산소', '질소', '이산화탄소', '아르곤'], answer: 1 },

  // 식물
  { id: 'q7',  cat: '식물', text: '식물에서 광합성이 주로 일어나는 기관은?', 
    choices: ['뿌리', '줄기', '잎', '꽃'], answer: 2 },
  { id: 'q8',  cat: '식물', text: '다음 중 뿌리의 주된 역할이 아닌 것은?', 
    choices: ['물과 무기질 흡수', '식물체 지지', '양분 저장', '광합성'], answer: 3 },

  // 경제
  { id: 'q9',  cat: '경제', text: '국내에서 일정 기간 생산된 최종 재화·서비스의 합은?', 
    choices: ['CPI', 'GDP', 'GNI', '환율'], answer: 1 },
  { id: 'q10',  cat: '경제', text: '소비자 물가 변화를 나타내는 지표는?', 
    choices: ['실업률', '무역수지', '소비자물가지수(CPI)', '기준금리'], answer: 2 },

  // 세계
  { id: 'q11',  cat: '세계', text: '세계에서 면적이 가장 큰 나라는?', 
    choices: ['캐나다', '러시아', '중국', '미국'], answer: 1 },
  { id: 'q12', cat: '세계', text: '프랑스의 수도는?', 
    choices: ['베를린', '파리', '마드리드', '로마'], answer: 1 },
];


export default function App() {
  const [category, setCategory] = useState('ALL');
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});

  const tabs = useMemo(() => {
    const set = new Set(QUESTIONS.map(q => q.cat));
    return ['ALL', ...Array.from(set)];
  }, []);

  const filtered = useMemo(() => {
    return category === 'ALL' ? QUESTIONS : QUESTIONS.filter(q => q.cat === category);
  }, [category]);

  const current = filtered[index] ?? null;

  // ✅ useMemo 철자, 문법 수정
  const score = useMemo(() => {
    return filtered.reduce((acc, q) => acc + (answers[q.id] === q.answer ? 1 : 0), 0);
  }, [answers, filtered]);

  const completed = filtered.length > 0 && filtered.every(q => answers[q.id] !== undefined);

  useEffect(() => {
    setIndex(0);
  }, [category]);

  // ✅ document.title + 백틱(`)
  useEffect(() => {
    if (completed) {
      document.title = `완료! 점수 ${score}/${filtered.length}`;
    } else {
      document.title = `문제 ${filtered.length ? index + 1 : 0}/${filtered.length}`;
    }
  }, [completed, score, index, filtered.length]);

  function handleSelect(choiceIndex) {
    if (!current) return;
    setAnswers(prev => ({ ...prev, [current.id]: choiceIndex }));
  }

  function goPrev() { setIndex(i => Math.max(0, i - 1)); }
  function goNext() { setIndex(i => Math.min(filtered.length - 1, i + 1)); }

  function resetCurrentCategory() {
    const ids = new Set(filtered.map(q => q.id));
    setAnswers(prev => {
      const next = { ...prev };
      for (const id of ids) delete next[id];
      return next;
    });
    setIndex(0);
  }

  return (
    <div style={{ fontFamily: 'system-ui', maxWidth: 880, margin: '24px auto', padding: 16 }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ margin: 0 }}>🧠 상식 퀴즈</h1>
        <ScoreBadge score={score} total={filtered.length} />
      </header>

      <CategoryTabs current={category} onChange={setCategory} tabs={tabs} />

      {filtered.length === 0 && <p style={{ opacity: 0.7 }}>문제 준비 중...</p>}

      {current && (
        <QuestionCard
          key={current.id}
          question={current}
          selected={answers[current.id]}
          onSelect={handleSelect}
        />
      )}

      {/* ✅ center 오타 수정 */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginTop: 12 }}>
        <button onClick={goPrev} disabled={index === 0}>이전</button>
        <button onClick={goNext} disabled={index >= filtered.length - 1}>다음</button>
        <button onClick={resetCurrentCategory} style={{ marginLeft: 'auto' }}>리셋</button>
        {completed && <span style={{ fontSize: 13, opacity: 0.8 }}>문제를 전부 풀었어요!</span>}
      </div>

      {completed && (
        <ResultPanel
          score={score}
          total={filtered.length}
          onRestart={resetCurrentCategory}
        />
      )}
    </div>
  );
}
