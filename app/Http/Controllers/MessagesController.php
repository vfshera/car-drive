<?php

namespace App\Http\Controllers;


use App\Models\User;
use Carbon\Carbon;
use Cmgmyr\Messenger\Models\Message;
use Cmgmyr\Messenger\Models\Participant;
use Cmgmyr\Messenger\Models\Thread;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Http\Resources\ThreadResource;
use Symfony\Component\HttpFoundation\Response;

class MessagesController extends Controller
{
     /**
     * Show all of the message threads to the user.
     *
     * @return mixed
     */
    public function index()
    {
        $threads = Thread::forUser(Auth::id())
            ->withCount('messages')
            ->latest()
            ->get()
            ->reject(function ($value) {
                return $value->messages_count == 1 && $value->creator() == Auth::user();
            });

        return ThreadResource::collection($threads)->response()->setStatusCode(Response::HTTP_OK);
    }

    /**
     * Shows a message thread.
     *
     * @param $id
     * @return mixed
     */
    public function show(Thread $thread)
    {
        $thread->markAsRead(Auth::id());

        return response(['thread' => $thread] , Response::HTTP_OK);
    }

    /**
     * Creates a new message thread.
     *
     * @return mixed
     */
    public function recipients()
    {
        $users = User::where('id', '!=', Auth::id())->get();

        return response(['recipients' => $users] , Response::HTTP_OK);
    }

    /**
     * Stores a new message thread.
     *
     * @return mixed
     */
    public function create(Request $request)
    {


        $thread = Thread::create([
            'subject' => $request->subject,
        ]);

        // Message
        Message::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'body' => $request->message,
        ]);

        // Sender
        Participant::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'last_read' => new Carbon,
        ]);

        // Recipients
        $thread->addParticipant($request->recipient);

        return response(['message' => 'Message sent successfully!'] , Response::HTTP_CREATED);
    }

    /**
     * Adds a new message to a current thread.
     *
     * @param $id
     * @return mixed
     */
    public function update(Request $request, Thread $thread)
    {
        $thread->activateAllParticipants();

        Message::create([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
            'body' => $request->message,
        ]);

        $participant = Participant::firstOrCreate([
            'thread_id' => $thread->id,
            'user_id' => Auth::id(),
        ]);

        $participant->last_read = new Carbon;
        $participant->save();

        return response(['message' => 'Message updated successfully!'] , Response::HTTP_OK);
    }

    public function destroy(Thread $thread)
    {
        $thread->removeParticipant(Auth::id());

        return response(['message' => 'Message deleted successfully!'] , Response::HTTP_OK);
    }
}

