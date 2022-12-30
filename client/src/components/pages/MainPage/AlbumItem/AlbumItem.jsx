import React from 'react';
import s from './AlbumItem.module.css'
import TrackItem from "../TrackItem/TrackItem";
import Cover from "../../../UI/Cover/Cover";

const AlbumItem = ({album, nickname}) => {
    return (
        <div className={s.wrapper}>
            <div className={s.part}>
                {/*<div className={s.imageWrapper}>*/}
                {/*    <img/>*/}
                {/*</div>*/}
                <Cover cover={album.image}/>
            </div>
            <div className={s.part}>
                <h1>{album.title}</h1>
                {album.tracks.length === 0 ? (
                    <i>Треков пока нет</i>
                ) : (
                    album.tracks.map(track => <TrackItem key={track._id} track={track}/>)
                )}
            </div>
        </div>
    );
};

export default AlbumItem;