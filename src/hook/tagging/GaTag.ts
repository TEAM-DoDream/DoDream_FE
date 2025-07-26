import { useCallback } from 'react';
import ReactGA from 'react-ga4';

export type EventPayload = {
  action: string;
  category: string;
  label?: string;
  value?: number;
  send_to?: string; // override 가능
};

export function useAnalytics() {
  const MEASUREMENT_ID = 'G-VZ2PE4BQ7W';

  /**
   * 페이지뷰 전송
   */
  const trackPageView = useCallback((path: string) => {
    ReactGA.send({
      hitType: 'page_view',
      page: path,
      send_to: MEASUREMENT_ID,
    });
  }, []);

  /**
   * 커스텀 이벤트 전송
   */
  const trackEvent = useCallback(
    ({ action, category, label, value }: EventPayload) => {
      console.log('📊 GA 이벤트 전송:', { action, category, label, value });
      
      ReactGA.event({
        action,
        category,
        label,
        value,
      });
    },
    []
  );

  return { trackPageView, trackEvent };
}
