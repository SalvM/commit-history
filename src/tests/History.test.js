import { render, screen, waitFor } from '@testing-library/react';

import HistoryPage from '../pages/HistoryPage';

test('history page loads list correctly', async () => {
  const {container} = render(<HistoryPage />);
  const refreshButton = screen.getByText(/Refresh$/);
  expect(refreshButton).toBeInTheDocument();
  refreshButton.click();
  await waitFor(() => expect(refreshButton).toBeDisabled(), { timeout: 1000 });
  await waitFor(() => {
    const listItem = container.querySelectorAll('.commit');
    expect(listItem.length).not.toBeLessThan(1);
  });
});