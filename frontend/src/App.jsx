import { useState, useEffect } from 'react';

const API_URL = import.meta.env.VITE_API_URL;

const styles = {
  page: {
    minHeight: '100vh',
    background: '#f4f6f8',
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
    padding: '3rem 1.5rem',
  },
  container: {
    maxWidth: '900px',
    margin: '0 auto',
  },
  headerRow: {
    marginBottom: '1.5rem',
  },
  title: {
    fontSize: '2rem',
    fontWeight: 700,
    color: '#1a202c',
    margin: 0,
  },
  subtitle: {
    color: '#64748b',
    marginTop: '0.25rem',
    fontSize: '0.95rem',
  },
  card: {
    background: '#ffffff',
    borderRadius: '10px',
    boxShadow: '0 1px 3px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)',
    overflow: 'hidden',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  th: {
    textAlign: 'left',
    padding: '0.9rem 1.25rem',
    background: '#f8fafc',
    color: '#475569',
    fontSize: '0.8rem',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    borderBottom: '1px solid #e2e8f0',
  },
  td: {
    padding: '0.9rem 1.25rem',
    borderBottom: '1px solid #edf2f7',
    color: '#1e293b',
    fontSize: '0.95rem',
  },
  statusBadge: (status) => {
    const normalized = (status || '').toLowerCase();
    let bg = '#e2e8f0';
    let color = '#334155';
    if (normalized.includes('transit')) {
      bg = '#fef3c7';
      color = '#92400e';
    } else if (normalized.includes('delivered')) {
      bg = '#dcfce7';
      color = '#166534';
    } else if (normalized.includes('pending')) {
      bg = '#e0f2fe';
      color = '#075985';
    }
    return {
      display: 'inline-block',
      padding: '0.25rem 0.65rem',
      borderRadius: '9999px',
      fontSize: '0.8rem',
      fontWeight: 600,
      background: bg,
      color,
    };
  },
  message: {
    padding: '2rem',
    textAlign: 'center',
    color: '#64748b',
  },
  error: {
    padding: '2rem',
    textAlign: 'center',
    color: '#b91c1c',
    background: '#fef2f2',
    borderRadius: '10px',
    border: '1px solid #fecaca',
  },
};

export default function App() {
  const [shipments, setShipments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchShipments() {
      try {
        setLoading(true);
        setError(null);

        if (!API_URL) {
          throw new Error('VITE_API_URL is not configured');
        }

        const response = await fetch(`${API_URL}/api/shipments`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = await response.json();
        setShipments(data);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Failed to load shipments');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchShipments();

    return () => controller.abort();
  }, []);

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        <div style={styles.headerRow}>
          <h1 style={styles.title}>Shipments</h1>
          <p style={styles.subtitle}>
            Alexmar Logistics Pro &middot; Live shipment tracking
          </p>
        </div>

        <div style={styles.card}>
          {loading && <div style={styles.message}>Loading shipments...</div>}

          {!loading && error && (
            <div style={styles.error}>
              Unable to load shipments: {error}
            </div>
          )}

          {!loading && !error && shipments.length === 0 && (
            <div style={styles.message}>No shipments found.</div>
          )}

          {!loading && !error && shipments.length > 0 && (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.th}>ID</th>
                  <th style={styles.th}>Name</th>
                  <th style={styles.th}>Status</th>
                </tr>
              </thead>
              <tbody>
                {shipments.map((shipment) => (
                  <tr key={shipment.id}>
                    <td style={styles.td}>{shipment.id}</td>
                    <td style={styles.td}>{shipment.name}</td>
                    <td style={styles.td}>
                      <span style={styles.statusBadge(shipment.status)}>
                        {shipment.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
}
