'use client';

import { useState } from 'react';

export default function Home() {
  const [contestants, setContestants] = useState([
    { id: 1, name: 'Iron Man', votes: 0, emoji: '🦾' },
    { id: 2, name: 'Captain America', votes: 0, emoji: '🛡️' },
    { id: 3, name: 'Thor', votes: 0, emoji: '⚡' },
    { id: 4, name: 'Hulk', votes: 0, emoji: '💪' },
    { id: 5, name: 'Black Widow', votes: 0, emoji: '🕷️' },
    { id: 6, name: 'Hawkeye', votes: 0, emoji: '🏹' },
  ]);

  const [newName, setNewName] = useState('');
  const [hasVoted, setHasVoted] = useState(false);

  const vote = (id) => {
    setContestants(contestants.map(c =>
      c.id === id ? { ...c, votes: c.votes + 1 } : c
    ));
    setHasVoted(true);
    setTimeout(() => setHasVoted(false), 500);
  };

  const addContestant = () => {
    if (newName.trim()) {
      const emojis = ['⭐', '🔥', '💎', '🏆', '👑', '🎯', '🚀', '💫', '🌟', '✨'];
      const randomEmoji = emojis[Math.floor(Math.random() * emojis.length)];
      setContestants([...contestants, {
        id: Date.now(),
        name: newName.trim(),
        votes: 0,
        emoji: randomEmoji
      }]);
      setNewName('');
    }
  };

  const reset = () => {
    setContestants(contestants.map(c => ({ ...c, votes: 0 })));
  };

  const sorted = [...contestants].sort((a, b) => b.votes - a.votes);
  const winner = sorted[0];
  const totalVotes = contestants.reduce((sum, c) => sum + c.votes, 0);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '40px 20px',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      <div style={{
        maxWidth: '800px',
        margin: '0 auto',
        background: 'white',
        borderRadius: '20px',
        padding: '40px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <h1 style={{
          textAlign: 'center',
          fontSize: '48px',
          marginBottom: '10px',
          background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          fontWeight: '800'
        }}>
          Who is the Best? 🏆
        </h1>

        <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>
          Cast your vote and see who comes out on top!
        </p>

        {totalVotes > 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            padding: '30px',
            borderRadius: '15px',
            marginBottom: '30px',
            textAlign: 'center',
            color: 'white'
          }}>
            <div style={{ fontSize: '60px', marginBottom: '10px' }}>
              {winner.emoji}
            </div>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '32px' }}>
              {winner.name}
            </h2>
            <p style={{ margin: 0, fontSize: '18px', opacity: 0.9 }}>
              Leading with {winner.votes} votes ({totalVotes > 0 ? Math.round(winner.votes / totalVotes * 100) : 0}%)
            </p>
          </div>
        )}

        <div style={{ marginBottom: '30px' }}>
          {sorted.map((contestant, index) => {
            const percentage = totalVotes > 0 ? (contestant.votes / totalVotes * 100) : 0;
            return (
              <div key={contestant.id} style={{
                marginBottom: '15px',
                background: '#f8f9fa',
                borderRadius: '12px',
                overflow: 'hidden',
                transition: 'transform 0.2s',
                border: '2px solid transparent',
                position: 'relative'
              }}>
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  height: '100%',
                  width: `${percentage}%`,
                  background: index === 0 && totalVotes > 0
                    ? 'linear-gradient(90deg, #f093fb 0%, #f5576c 100%)'
                    : 'linear-gradient(90deg, #667eea 0%, #764ba2 100%)',
                  opacity: 0.1,
                  transition: 'width 0.5s ease'
                }}></div>

                <div style={{
                  padding: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  position: 'relative'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span style={{ fontSize: '36px' }}>{contestant.emoji}</span>
                    <div>
                      <div style={{ fontWeight: '600', fontSize: '20px', color: '#333' }}>
                        {contestant.name}
                      </div>
                      <div style={{ color: '#666', fontSize: '14px' }}>
                        {contestant.votes} votes {percentage > 0 && `(${percentage.toFixed(1)}%)`}
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => vote(contestant.id)}
                    style={{
                      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                      color: 'white',
                      border: 'none',
                      padding: '12px 30px',
                      borderRadius: '25px',
                      fontSize: '16px',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'transform 0.2s',
                      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.4)'
                    }}
                    onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
                    onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
                  >
                    Vote
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px'
        }}>
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && addContestant()}
            placeholder="Add a new contestant..."
            style={{
              flex: 1,
              padding: '15px',
              borderRadius: '12px',
              border: '2px solid #e0e0e0',
              fontSize: '16px',
              outline: 'none'
            }}
          />
          <button
            onClick={addContestant}
            style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 30px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              whiteSpace: 'nowrap'
            }}
          >
            Add
          </button>
        </div>

        <button
          onClick={reset}
          style={{
            width: '100%',
            background: '#f8f9fa',
            color: '#666',
            border: '2px solid #e0e0e0',
            padding: '15px',
            borderRadius: '12px',
            fontSize: '16px',
            fontWeight: '600',
            cursor: 'pointer'
          }}
        >
          Reset All Votes
        </button>

        <div style={{
          marginTop: '30px',
          textAlign: 'center',
          color: '#999',
          fontSize: '14px'
        }}>
          Total votes cast: {totalVotes}
        </div>
      </div>
    </div>
  );
}
