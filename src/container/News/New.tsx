import './News.scss';

const NewSection = () => {
  return (
    <section className='info'>
      <div className='info-title'>
        <h3>藝文最新消息</h3>
        <a className='link' href='#'>
          查看更多
        </a>
      </div>
      <div className='info-news'>
        <div className='main'></div>
        <div className='side'>
          <div className='secondary'></div>
          <div className='third'>
            <div className='third-item'></div>
            <div className='third-item'></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewSection;
