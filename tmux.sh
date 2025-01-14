S="casify"

tmux new -s $S -n nvim -d
tmux send-keys -t $S:nvim 'nvim' Enter
tmux new-window -t $S -d -n turbo
tmux send-keys -t $S:turbo 'pnpm dev' Enter
tmux new-window -t $S -d -n lazygit
tmux send-keys -t $S:lazygit 'lazygit' Enter
tmux new-window -t $S -d -n stripe
tmux send-keys -t $S:stripe 'stripe listen --forward-to localhost:5000/api/v1/orders/callback' Enter
tmux new-window -t $S -d -n studio
tmux send-keys -t $S:studio 'pnpm db:studio' Enter

tmux attach -t $S
