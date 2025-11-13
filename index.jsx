import React, { useState } from 'react';

// Simple Y2K-style desktop shell with icons that open popup windows.
// Tailwind CSS is expected to be available in the project.

export default function App() {
  const apps = [
    { id: 'pet', title: '디지털 펫', icon: '/assets/icons/pet.png' },
    { id: 'paint', title: '그림판', icon: '/assets/icons/paint.png' },
    { id: 'piano', title: '피아노', icon: '/assets/icons/piano.png' },
    { id: 'cards', title: '카드 짝맞추기', icon: '/assets/icons/cards.png' },
    { id: 'dino', title: '공룡게임', icon: '/assets/icons/dino.png' }
  ];

  const [openWindows, setOpenWindows] = useState([]);

  function openApp(app) {
    // prevent duplicates: bring to front if already open
    setOpenWindows(prev => {
      if (prev.find(w => w.id === app.id)) {
        // bump zIndex by moving to end
        return [...prev.filter(w => w.id !== app.id), { ...app }];
      }
      return [...prev, { ...app }];
    });
  }

  function closeApp(id) {
    setOpenWindows(prev => prev.filter(w => w.id !== id));
  }

  return (
    <div className="w-screen h-screen bg-cover bg-center" style={{ backgroundImage: "url('/assets/bg/y2k_desktop.jpg')" }}>
      {/* Top taskbar */}
      <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-3">
          <button className="bg-white/20 backdrop-blur-sm px-3 py-1 rounded-2xl text-sm">Start</button>
          <div className="flex gap-2">
            {apps.slice(0,3).map(a => (
              <button key={a.id} onClick={() => openApp(a)} className="px-2 py-1 rounded text-xs bg-white/10">{a.title}</button>
            ))}
          </div>
        </div>
        <div className="text-xs bg-white/10 px-2 py-1 rounded">11:32 PM</div>
      </div>

      {/* Icons on desktop */}
      <div className="p-8 grid grid-cols-2 gap-6 w-[320px]">
        {apps.map(app => (
          <div key={app.id} className="flex flex-col items-center cursor-pointer select-none" onDoubleClick={() => openApp(app)} onClick={() => openApp(app)}>
            <img src={app.icon} alt={app.title} className="w-16 h-16 mb-2" />
            <div className="text-xs text-white text-center drop-shadow-md">{app.title}</div>
          </div>
        ))}
      </div>

      {/* Open windows area */}
      {openWindows.map((w, idx) => (
        <Window key={w.id} z={100 + idx} app={w} onClose={() => closeApp(w.id)} />
      ))}

      {/* Footer hint */}
      <div className="absolute left-6 bottom-24 text-sm text-white/80">아이콘을 클릭하거나 더블클릭하여 창을 엽니다.</div>
    </div>
  );
}

function Window({ app, onClose, z }) {
  // Simple floating window centered with header
  return (
    <div className="absolute top-24 left-1/2 transform -translate-x-1/2 w-[640px] max-w-[90%] bg-white/95 rounded-lg shadow-2xl overflow-hidden" style={{ zIndex: z }}>
      <div className="flex items-center justify-between px-3 py-2 bg-gradient-to-r from-sky-300 to-fuchsia-300">
        <div className="flex items-center gap-2">
          <img src={app.icon} alt="icon" className="w-6 h-6" />
          <div className="font-semibold text-sm">{app.title}</div>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={onClose} className="w-7 h-7 rounded-full bg-white/60 text-sm">✕</button>
        </div>
      </div>
      <div className="p-4 min-h-[320px] bg-white">
        <GamePlaceholder id={app.id} />
      </div>
    </div>
  );
}

function GamePlaceholder({ id }) {
  // Placeholders for each mini-game. We'll implement each later.
  switch (id) {
    case 'pet':
      return (
        <div>
          <h3 className="text-lg font-bold">디지털 펫 (초기 버전)</h3>
          <p className="mt-2">먹이주기와 놀아주기 버튼이 있는 간단한 상호작용 자리입니다. 추후 상태 저장(localStorage)과 애니메이션 추가 예정.</p>
          <div className="mt-4 flex gap-3">
            <button className="px-3 py-1 rounded bg-blue-500 text-white">먹이주기</button>
            <button className="px-3 py-1 rounded bg-green-500 text-white">놀아주기</button>
          </div>
        </div>
      );

    case 'paint':
      return (
        <div>
          <h3 className="text-lg font-bold">그림판</h3>
          <p className="mt-2">캔버스와 브러시 크기/색상 컨트롤이 들어갈 자리입니다. 사용자는 업로드가 아닌 미리 정해진 이미지를 불러와 작업합니다.</p>
          <div className="mt-4 border rounded p-2 min-h-[200px] flex items-center justify-center">Canvas Placeholder</div>
        </div>
      );

    case 'piano':
      return (
        <div>
          <h3 className="text-lg font-bold">피아노</h3>
          <p className="mt-2">키를 클릭하면 소리가 납니다. 간단한 시퀀스 녹음/재생 기능 예정.</p>
          <div className="mt-4 flex gap-2">{Array.from({ length: 7 }).map((_, i) => <div key={i} className="w-10 h-24 border">Key</div>)}</div>
        </div>
      );

    case 'cards':
      return (
        <div>
          <h3 className="text-lg font-bold">카드 짝맞추기</h3>
          <p className="mt-2">4x4 그리드로 카드 뒤집기 로직이 들어갑니다. 정해진 이미지 세트로 플레이합니다.</p>
          <div className="mt-4 grid grid-cols-4 gap-2">{Array.from({ length: 16 }).map((_, i) => (
            <div key={i} className="h-20 bg-slate-200 rounded flex items-center justify-center">Card</div>
          ))}</div>
        </div>
      );

    case 'dino':
      return (
        <div>
          <h3 className="text-lg font-bold">공룡게임</h3>
          <p className="mt-2">런닝 게임 플레이어와 점프/장애물 로직 자리입니다. 간단한 키보드 이벤트로 조작합니다.</p>
          <div className="mt-4 border rounded p-2 min-h-[120px] flex items-center justify-center">Game Canvas Placeholder</div>
        </div>
      );

    default:
      return <div>알 수 없는 앱</div>;
  }
}

/*
README / Assets list

아래는 이 프로젝트의 초기 자산 목록과 권장 캔버스(이미지) 크기입니다. 디자인 파일을 제작할 때 다음 규격을 권장합니다.

1) 배경 이미지 (데스크탑)
   - 파일명: /assets/bg/y2k_desktop.jpg
   - 권장 크기: 1920 x 1080 (JPG 또는 PNG)
   - 설명: 전체 배경으로 사용. 패턴이나 그라디언트 포함 가능.

2) 앱 아이콘 (각 앱)
   - 파일명 예: /assets/icons/pet.png, paint.png, piano.png, cards.png, dino.png
   - 권장 크기: 128 x 128 (PNG, 투명 배경)
   - 마이크로 버전: 64 x 64 (작게 쓰일 때)

3) 창 헤더에서 사용할 작은 아이콘
   - 파일명: /assets/icons/pet_small.png ...
   - 권장 크기: 24 x 24 (PNG)

4) 게임에서 사용할 정해진 이미지 세트 (예: 카드 이미지 세트)
   - 경로: /assets/games/cards/set1/
   - 권장 크기: 200 x 200 (PNG) — 카드 이미지
   - 개수: 최소 8쌍(총 16장)

5) 디지털 펫 스프라이트
   - 경로: /assets/games/pet/
   - 권장 크기: 256 x 256 (프레임 단위 또는 단일 이미지)
   - 애니메이션을 원하면 프레임 시트 또는 여러 파일로 제공

6) 그림판의 기본 템플릿 이미지
   - 경로: /assets/games/paint/templates/
   - 권장 크기: 1024 x 768 (PNG)
   - 설명: 사용자가 불러와서 색칠하거나 수정할 기본 이미지들

7) 공룡게임용 스프라이트(주인공, 장애물, 배경 타일)
   - 경로: /assets/games/dino/
   - 권장 크기: 주인공 64x64, 장애물 48x48, 배경 타일 240x120

프로젝트 구조(권장):
/src
  /components
  /pages
  /styles
/public
  /assets


다음 단계로 제가 할 일 제안:
- 각 미니게임의 기본 인터랙션(먹이주기 버튼 → 펫 상태 변화, 카드 뒤집기 로직 등)을 단계별로 구현
- 로컬 저장(localStorage)으로 상태 유지
- 키보드/마우스 입력 처리 및 모바일 대응

원하시면 바로 "디지털 펫"의 기본 상태와 먹이주기/놀아주기 로직을 코드로 구현해 드릴게요.
*/

