<img width="300px" src="https://cdn1.iconfinder.com/data/icons/just-for-fun/64/__notification_messege_alarm-512.png" />

# rt-notify  v2.0.0  


##### _simple yet powerful notifications for React_


## Refactor
  - put types in proper context [d84a952e](https://github.com/glebcha/rt-notify/commit/d84a952e9c87c6df75e986b5952720ba343ee6a2) 
    - use ramda lib instead bitdev repo modules [8ff72759](https://github.com/glebcha/rt-notify/commit/8ff72759208eef767ebe1d592fb5665ea61d91c4) 
    - replaced classnames with clsx [dc2fad39](https://github.com/glebcha/rt-notify/commit/dc2fad39276474c1e008c565172fc5414685b9ab) 
  
  - **logger**
    - get rid of chalk [80c0ddee](https://github.com/glebcha/rt-notify/commit/80c0ddee59aeb5b099d6385d08398cdbf8b6dd97) 
  



## Chore
  - added stories scripts [fa0005bc](https://github.com/glebcha/rt-notify/commit/fa0005bc25b069179e2269bba2d1d0632cf868df) 
    - removed start script [d6fb70ab](https://github.com/glebcha/rt-notify/commit/d6fb70ab40163eba4276c1cdd348d19f32e9565b) 
    - optimized tsconfig [6884cb97](https://github.com/glebcha/rt-notify/commit/6884cb9730d698388ceb09048dd369571f435d75) 
    - lowered bundle size limit [6b038fc8](https://github.com/glebcha/rt-notify/commit/6b038fc832b04982c2f77f5adb72a74c6a0119fc) 
    - optimized scripts and updated dependencies [2bfa220f](https://github.com/glebcha/rt-notify/commit/2bfa220ffc7124dff845678840b7e7e7be3b297a) 
    - changed types location [ceacb19a](https://github.com/glebcha/rt-notify/commit/ceacb19a334062fe25aeaf2688ec0df580f17d70) 
    - changed entrypoint file extension to follow content semantic [e88b9ab8](https://github.com/glebcha/rt-notify/commit/e88b9ab8517a31b2e7776e2e117078db26336121) 
    - updated changelog [7a0198e6](https://github.com/glebcha/rt-notify/commit/7a0198e65b26748db3619ee241bb365b0f81ed09) 
  
  - **build**
    - get rid of babel, included all external dependencies except react, build umd brwoser module [8c72b44b](https://github.com/glebcha/rt-notify/commit/8c72b44bf533c0f341da216afd0994f0ee0f7f6f) 
      - removed babel config [2025e7cf](https://github.com/glebcha/rt-notify/commit/2025e7cf75b121eb6624a7dc5f142c9e9f1906ec) 
  
  - **lint**
    - removed deprecated prettier plugins [ddc8b734](https://github.com/glebcha/rt-notify/commit/ddc8b7348532e37e4bdacc401a2beabfb56added) 
  



