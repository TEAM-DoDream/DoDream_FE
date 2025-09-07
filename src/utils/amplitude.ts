// Amplitude 이벤트 트래킹 유틸리티 함수

export const trackTodoImport = (todoTitle: string) => {
  if (
    typeof window !== 'undefined' &&
    'amplitude' in window &&
    window.amplitude
  ) {
    const currentPath = location.pathname;
    let sourcePage = '';

    // source_page 설정
    if (currentPath.includes('/community')) {
      sourcePage = 'community/';
    } else if (currentPath.includes('/jobinfo')) {
      sourcePage = 'jobinfo/';
    } else if (currentPath.includes('/otherslist')) {
      sourcePage = 'otherslist/';
    } else {
      sourcePage = currentPath;
    }

    window.amplitude.track('todo_import', {
      source_method: 'copy_btn',
      source_page: sourcePage,
      todo_length: todoTitle.length,
      timestamp: new Date().toISOString(),
    });
    console.log('Amplitude event sent: todo_import');
  }
};
