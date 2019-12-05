export const getAllPostQuery = `SELECT p.title, p.content, p.created_at , a.username , array_agg(DISTINCT c.content) as comments
FROM public.post as p 
INNER JOIN public.author as a ON p.id_author = a.id 
LEFT JOIN (SELECT * FROM COMMENT) AS c ON c.id_post = p.id
GROUP BY p.title, p.content, p.created_at, a.username
ORDER BY p.created_at ASC`;

export function getSinglePostQuery(id: string): string {
	return `SELECT p.title, p.content, p.created_at , a.username , array_agg(DISTINCT c.content) as comments
    FROM public.post as p 
    INNER JOIN public.author as a ON p.id_author = a.id AND p.id = ${id}
    LEFT JOIN (SELECT * FROM COMMENT) AS c ON c.id_post = p.id AND p.id = ${id} 
    GROUP BY p.title, p.content, p.created_at, a.username`;
}

export function insertCommentQuery(
	content: string,
	author: string,
	id_post: string
): string {
	return `INSERT INTO comment(
        content,id_author,id_post)
        VALUES ('${content}',${author},${id_post}) 
        RETURNING *;`;
}

export function insertPostQuery(
	title: string,
	content: string,
	id_author: string
): string {
	return `INSERT INTO post(
        title, content, id_author,created_at,update_at)
		VALUES ('${title}', '${content}',${id_author},
		CURRENT_TIMESTAMP,CURRENT_TIMESTAMP)
		RETURNING *;`;
}

export function serializeJSON(fields: object, postId: string): string {
	let query = `UPDATE post SET `;
	Object.entries(fields).forEach(([key, value]) => {
		query += `${key} = ${value},`;
	});
	query += `update_at = CURRENT_TIMESTAMP
              WHERE id=${postId}
	    	  RETURNING * ;`;
	return query;
}
